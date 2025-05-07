from rest_framework import serializers


class RunCodeValidator(serializers.Serializer):
    LANGUAGE_CHOICES = [
        "java",
        "cpp",
        "python",
        "javascript"
    ]
    lang = serializers.ChoiceField(
        choices=LANGUAGE_CHOICES,
    )
    code = serializers.CharField()
    testcases = serializers.CharField()

class SubmitCodeValidator(serializers.Serializer):
    LANGUAGE_CHOICES = [
        "java",
        "cpp",
        "python",
        "javascript"
    ]
    lang = serializers.ChoiceField(
        choices=LANGUAGE_CHOICES,
    )
    code = serializers.CharField()