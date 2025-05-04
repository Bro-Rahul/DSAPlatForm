import re
import ast
from cerberus import Validator

def find_min(input_str):
    regex = r"nums=\[(.*?)\]\$(\d+)"
    pattern = re.compile(regex)
    match = pattern.match(input_str)
    if not match:
        return {"valid":False,"error": "Input format does not match the required pattern"}

    try:
        num_list_str = match.group(1)
        num_list = ast.literal_eval(f"[{num_list_str}]")
        if not isinstance(num_list, list):
            raise ValueError
    except Exception:
        return {"valid":False,"error": "Invalid list format"}

    schema = {
        "nums": {
            "type": "list",
            "schema": {
                "type": "integer",
                "min": 1,
                "max": 10
            }
        },
        "k": {
            "type": "integer",
            "min": 1
        }
    }


    try:
        num_value = int(match.group(2))
    except Exception:
        return {"valid":False,"error": "Invalid number after $"}

    data = {
        "nums": num_list,
        "k": num_value
    }

    validator = Validator(schema)
    if validator.validate(data):
        return {"valid": True, "data": data}
    else:
        return {"valid":False,"error": validator.errors}


def format_cerberus_errors(errors, parent_key=''):
    messages = []

    if isinstance(errors, dict):
        for field, value in errors.items():
            key = f"{parent_key}.{field}" if parent_key else str(field)

            if isinstance(value, list):
                for item in value:
                    if isinstance(item, dict):
                        for sub_key, sub_val in item.items():
                            path = f"{key}[{sub_key}]"
                            messages.append(f"{path}: {', '.join(map(str, sub_val))}")
                    else:
                        messages.append(f"{key}: {item}")
            elif isinstance(value, dict):
                messages.extend(format_cerberus_errors(value, key))

    return messages

     

validators_func_dict = {
    "find_min" : find_min,
}
def validators_func(slug:str,testcases:list[str]):
    if validators_func_dict[slug]:
        fun = validators_func_dict[slug]
        for index,testcase in enumerate(testcases):
            test_result = fun(testcase)
            if not test_result['valid']:
                return {
                    'valid' : False,
                    'at' : index+1,
                    'error' : format_cerberus_errors(test_result['error']) 
                }
        return {
            'valid' : True,
        }
    else:
        raise Exception('notify admin to add the validator for your problem then try!')