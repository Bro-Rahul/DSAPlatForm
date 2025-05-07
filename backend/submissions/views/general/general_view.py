from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action
from typing import List

from ...validators.SubmissionSerializer import RunCodeValidator,SubmitCodeValidator
from constants.main import formateErrorMessage
from problems.models import Problems


import subprocess

class SubmissionsView(viewsets.ViewSet):
    lookup_field = 'slug'

    @action(detail=True,methods=["POST",],url_path='run-code')
    def run_code(self,request,slug=None):
        serializer = RunCodeValidator(data=request.data)
        try:
            obj = Problems.objects.values('testcases').get(slug=slug)   
        except Exception as e:
            return Response({
                'info':str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not serializer.is_valid():
            return Response({
                'info':formateErrorMessage(serializer.errors)
            })
        
        testcases:List[str] = serializer.validated_data.get('testcases')
        lang = serializer.validated_data.get('lang',None)
        code = serializer.validated_data.get('code',None)
        outputs:List[str] = []        
        
        result = subprocess.run(['docker','run','--rm',lang,code,testcases],text=True,capture_output=True)
        
        if result.returncode != 0:
            return Response({
                'info':result.stderr
                },status=status.HTTP_200_OK)

        execution_results: List[str] = result.stdout.split("\n")[:-1]
        for index, outputs in enumerate(execution_results):
            output,expectedOutput = outputs.split(" ")
            if output != expectedOutput:
                return Response({
                    'allPass': False,
                    'testcase': index+1,
                    'expected': expectedOutput,
                    'got': output
                },status=status.HTTP_200_OK)
        return Response({'allPass':True},status=status.HTTP_200_OK)


    @action(detail=True,methods=["POST",],url_path='submit-code')
    def submit_code(self,request,slug=None):
        serializer = SubmitCodeValidator(data=request.data)
        try:
            obj = Problems.objects.values('testcases').get(slug=slug)
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
        
        
        result = subprocess.run(['docker','run','--rm',lang,code,obj['testcases']],text=True,capture_output=True)
        
        if result.returncode != 0:
            return Response({
                'info':result.stderr
                },status=status.HTTP_200_OK)

        execution_results: List[str] = result.stdout.split("\n")[:-1]

        for index, outputs in enumerate(execution_results):
            output,expectedOutput = outputs.split(" ")
            if output != expectedOutput:
                return Response({
                    'allPass': False,
                    'testcase': index+1,
                    'expected': expectedOutput,
                    'got': output
                },status=status.HTTP_200_OK)
        return Response({'allPass':True},status=status.HTTP_200_OK)