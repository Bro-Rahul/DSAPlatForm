from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from typing import List
from ...validators.SubmissionSerializer import RunCodeValidator,SubmitCodeValidator
from constants.main import formateErrorMessage
from testcaseValidators.main import validators_func
from problems.models import Problems
from submissions.models import Submissions

from datetime import datetime
import uuid
import subprocess


class SubmissionsView(viewsets.ViewSet):
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.action in ["submit_code"]:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=True,methods=["POST",],url_path='run-code')
    def run_code(self,request,slug:str=None):
        serializer = RunCodeValidator(data=request.data)
        try:
            obj = Problems.objects.values('testcases','solution_codes').get(slug=slug)   
        except Exception as e:
            return Response({
                'info':str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not serializer.is_valid():
            return Response({
                'info':formateErrorMessage(serializer.errors)
            },status=status.HTTP_400_BAD_REQUEST)


        testcases:str = serializer.validated_data.get('testcases')
        lang = serializer.validated_data.get('lang',None)
        code = serializer.validated_data.get('code',None)
        validations = validators_func(slug=slug.replace("-","_"),testcases=testcases.split("\n"))
        container_name = f"temp_container_{uuid.uuid4().hex}"
        
        if not validations['valid']:
            return Response({
                'allPass' : False,
                'inValidTestCase' : True,
                'executionError' : False,
                'timeOut' : False,
                'timeOutAt' : None,
                'errors':validations,
                'result' : []
                },status=status.HTTP_200_OK)
        
        
        complete_code = f"{code}\n{obj['solution_codes'][lang]}"
        print(complete_code)
        print(lang)

        try:
            result = subprocess.run(
                ['docker','run','--rm','--name',container_name,lang,complete_code,testcases],
                text=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=10
            )
        except subprocess.TimeoutExpired as e:
            result = subprocess.run(
                ['docker','logs',container_name],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            err = subprocess.run(['docker', 'rm', '-f', container_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            execution_results: List[str] = result.stdout.split("\n")[:-1]
            testcaseAt = len(result.stdout.split("\n"))
            print(err.stderr)
            return Response({   
                'allPass': False,
                'inValidTestCase': False,
                'executionError': False,
                'timeOut': True,
                'timeOutAt' : testcaseAt,
                'errors': '',
                'result': execution_results,                
            },status=status.HTTP_200_OK)
        if result.returncode != 0:
            return Response({
                    'allPass': False,
                    'inValidTestCase' : False,
                    'timeOut': False,
                    'executionError' : True,
                    'timeOutAt' : None,
                    'errors':result.stderr,
                    'result' : []
                    },status=status.HTTP_200_OK)

        execution_results: List[str] = result.stdout.split("\n")[:-1]
        return Response({
            'allPass':True,
            'inValidTestCase' : False,
            'executionError' : False,
            'timeOut' : False,
            'timeOutAt' : None,
            'errors':'',
            'result' : execution_results
            },status=status.HTTP_200_OK)



    @action(detail=True,methods=["POST",],url_path='submit-code')
    def submit_code(self,request,slug=None):
        serializer = SubmitCodeValidator(data=request.data)
        try:
            obj = Problems.objects.get(slug=slug)
        except Exception as e:
            return Response({
                'info':str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not serializer.is_valid():
            return Response({
                'info':formateErrorMessage(serializer.errors)
            })
        
        lang = serializer.validated_data.get('lang',None)
        code = serializer.validated_data.get('code',None)
        complete_code = f"{obj.solution_codes[lang]}\n{code}"
        container_name = f"temp_container_{uuid.uuid4().hex}"
        testcases:List[str] = obj.testcases.split("\n")
        validations = validators_func(slug=slug.replace("-","_"),testcases=testcases)
        testcase_len = len(testcases)

        if not validations['valid']:
            return Response({
                'status' : "Rejected",
                'inValidTestCase' : True,
                'executionError' : False,
                'timeOut' : False,
                'timeOutAt' : None,
                'errors':validations,
                'dateTimestr' : datetime.now().isoformat()
                },status=status.HTTP_200_OK)
        
        submission = Submissions(
            user = request.user,
            problem = obj,
            submission_code = code,
            submission_lang = lang,            
        )

        try:
            result = subprocess.run(
                ['docker','run','--rm','--name',container_name,lang,complete_code,obj.testcases],
                text=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=5
                )
        except subprocess.TimeoutExpired as e:
            result = subprocess.run(
                ['docker','logs',container_name],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            timeoutAt = len(result.stdout.split("\n"))-1
            time_out_testcase = testcases[timeoutAt]
            subprocess.run([
                'docker', 'rm', '-f', container_name
                ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            submission.status = Submissions.Status.REJECTED
            submission.details = {   
                'status': "Rejected",
                'inValidTestCase': False,
                'executionError': False,
                'timeOut': True,
                'timeOutAt':timeoutAt,
                'output' : '',
                'testcasePassed' : f"{timeoutAt}/{testcase_len}",
                'testcase' : testcases[timeoutAt],
                'errors': time_out_testcase,
                'dateTimestr' : datetime.now().isoformat()
            }
            submission.save()
            return Response({   
                'status': "Rejected",
                'inValidTestCase': False,
                'executionError': False,
                'timeOut': True,
                'timeOutAt':timeoutAt,
                'output' : '',
                'testcasePassed' : f"{timeoutAt}/{testcase_len}",
                'testcase' : testcases[timeoutAt],
                'errors': time_out_testcase,
                'dateTimestr' : datetime.now().isoformat()
            },status=status.HTTP_200_OK)
        
        if result.returncode != 0:
            submission.status = Submissions.Status.REJECTED
            submission.details = {
                'status': "Rejected",
                'inValidTestCase' : False,
                'executionError' : True,
                'timeOut': False,
                'timeOutAt' : None, 
                'testcasePassed' : f"0/{testcase_len}",
                'testcase': testcases[0],
                'output' : "",
                'errors':result.stderr,
                'dateTimestr' : datetime.now().isoformat()
            }
            submission.save()
            return Response({
                    'status': "Rejected",
                    'inValidTestCase' : False,
                    'executionError' : True,
                    'timeOut': False,
                    'timeOutAt' : None, 
                    'testcasePassed' : f"0/{testcase_len}",
                    'testcase': testcases[0],
                    'output' : "",
                    'errors':result.stderr,
                    'dateTimestr' : datetime.now().isoformat()
                    },status=status.HTTP_200_OK)

        execution_results: List[str] = result.stdout.split("\n")[:-1]

        for index, outputs in enumerate(execution_results):
            output,expectedOutput = outputs.split(" ")
            if output != expectedOutput:
                submission.status = Submissions.Status.REJECTED
                submission.details = {
                    'status': "Rejected",
                    'inValidTestCase' : False,
                    'timeOut' : False,
                    'timeOutAt' : None,
                    'testcasePassed' : f"{index}/{testcase_len}",
                    'testcase': testcases[index],
                    'output' : f"{output} {expectedOutput}",
                    'error': '',
                    'dateTimestr' : datetime.now().isoformat()
                }
                submission.save()
                return Response({
                    'status': "Rejected",
                    'inValidTestCase' : False,
                    'timeOut' : False,
                    'timeOutAt' : None,
                    'testcasePassed' : f"{index}/{testcase_len}",
                    'testcase': testcases[index],
                    'output' : f"{output} {expectedOutput}",
                    'error': '',
                    'dateTimestr' : datetime.now().isoformat()
                },status=status.HTTP_200_OK)
        submission.status = Submissions.Status.ACCEPTED
        submission.details = {
            'status':"Accepted",
            'inValidTestCase' : False,
            'executionError' : False,
            'timeOut' : False,
            'timeOutAt' : None,
            'testcase': None,
            'testcasePassed' : f"{testcase_len}/{testcase_len}",
            'errors':'',
            'dateTimestr' : datetime.now().isoformat()
            }
        submission.save()
        return Response({
            'id' : submission.pk,
            'status':"Accepted",
            'inValidTestCase' : False,
            'executionError' : False,
            'timeOut' : False,
            'timeOutAt' : None,
            'testcase': None,
            'testcasePassed' : f"{testcase_len}/{testcase_len}",
            'errors':'',
            'dateTimestr' : datetime.now().isoformat()
            },status=status.HTTP_200_OK)