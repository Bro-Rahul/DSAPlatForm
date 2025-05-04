from typing import Dict,List

def defaultcodes()->dict:
    return {
        "cpp" : "",
        "java" : "",
        "python" : "",
        "javascript" : ""
    }

def formateErrorMessage(errors:Dict[str,List[str]])->List[str]:
    message:List[str] = []
    for key,val in errors.items():
        message.append(f"{key} {val[0]}")
    return message