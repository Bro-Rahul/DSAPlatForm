from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action

import subprocess

class SubmissionsView(viewsets.ViewSet):
    lookup_field = 'slug'

    @action(detail=True,methods=["POST",],url_path='run-code')
    def run_code(self,request,slug=None):
        code = request.data.get('code',None)
        lang = request.data.get('lang',None)
        result = subprocess.run(['docker','run','--rm',lang,code,'hellow world'],text=True,capture_output=True)
        if result.returncode !=0:
            return Response({'info':result.stderr})
        else:
            return Response({'info':result.stdout})
