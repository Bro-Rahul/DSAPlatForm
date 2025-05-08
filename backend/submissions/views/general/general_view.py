from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
import uuid

from typing import List


from ...validators.SubmissionSerializer import RunCodeValidator,SubmitCodeValidator
from constants.main import formateErrorMessage
from testcaseValidators.main import validators_func
from problems.models import Problems
from submissions.models import Submissions


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
                'errors':validations,
                'result' : []
                },status=status.HTTP_200_OK)
        
        
        complete_code = f"{obj['solution_codes'][lang]}\n{code}"
        try:
            result = subprocess.run(
                ['docker','run','--rm','--name',container_name,lang,complete_code,testcases],
                text=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=5
            )
        except subprocess.TimeoutExpired as e:
            subprocess.run(['docker', 'rm', '-f', container_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            return Response({   
                'allPass': False,
                'inValidTestCase': False,
                'executionError': False,
                'timeOut': True,
                'errors': 'Time Limit Exceeded!',
                'result': [],                
            },status=status.HTTP_200_OK)
        if result.returncode != 0:
            return Response({
                    'allPass': False,
                    'inValidTestCase' : False,
                    'timeOut': False,
                    'executionError' : True,
                    'errors':result.stderr,
                    'result' : []
                    },status=status.HTTP_200_OK)

        execution_results: List[str] = result.stdout.split("\n")[:-1]
        return Response({
            'allPass':True,
            'inValidTestCase' : False,
            'executionError' : False,
            'timeOut' : False,
            'errors':'',
            'result' : execution_results
            },status=status.HTTP_200_OK)



    @action(detail=True,methods=["POST",],url_path='submit-code')
    def submit_code(self,request,slug=None):
        serializer = SubmitCodeValidator(data=request.data)
        try:
            obj = Problems.objects.values('testcases','id','solution_codes').get(slug=slug)
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
        
        complete_code = f"{obj['solution_codes'][lang]}\n{code}"
        
        result = subprocess.run(['docker','run','--rm',lang,complete_code,obj['testcases']],text=True,capture_output=True)
        submissions = Submissions(
            problem=obj['id'],
            user=request.user.id,
            submission_code=code,
            submission_lang = lang
        )
        if result.returncode != 0:
            submissions.status = Submissions.Status.REJECTED
            submissions.description = result.stderr
            submissions.save()
            return Response({
                'info':result.stderr
                },status=status.HTTP_200_OK)

        execution_results: List[str] = result.stdout.split("\n")[:-1]
        testcases = obj['testcases'].split("\n")[:-1]

        for index, outputs in enumerate(execution_results):
            output,expectedOutput = outputs.split(" ")
            if output != expectedOutput:
                submissions.status = Submissions.Status.REJECTED
                submissions.description = f"Failed on testcase {testcases[index]} got {output} expected {expectedOutput}"
                submissions.save()
                return Response({
                    'allPass': False,
                    'testcase': index+1,
                    'expected': expectedOutput,
                    'got': output
                },status=status.HTTP_200_OK)
        submissions.status = Submissions.Status.ACCEPTED
        submissions.save()
        return Response({'allPass':True},status=status.HTTP_200_OK)