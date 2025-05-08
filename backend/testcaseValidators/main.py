import re
import ast
from cerberus import Validator
from typing import List

def find_min(input_str):
    # Normalize spaces around the '=' sign and trim the input string
    input_str = re.sub(r"\s*=\s*", "=", input_str.strip())

    # Updated regex to match the standardized input format
    regex = r"nums=\[(.*?)\]"
    pattern = re.compile(regex)
    match = pattern.match(input_str)
    if not match:
        return {"valid": False, "error": "Input format does not match the required pattern make sure it is a list"}

    try:
        # Extracting the content between brackets
        num_list_str = match.group(1)
        # Using list comprehension to handle spaces between numbers
        num_list = [int(x) for x in map(str.strip, num_list_str.split(',')) if x]

        # Check if the list contains only integers
        if not all(isinstance(num, int) for num in num_list):
            raise ValueError
    except Exception:
        return {"valid": False, "error": "Invalid list format expected only Integer values in list"}

    # Schema definition for validation
    schema = {
        "nums": {
            "type": "list",
            "schema": {
                "type": "integer",
                "min": 1,
                "max": 10
            }
        },
    }

    data = {
        "nums": num_list,
    }

    validator = Validator(schema)
    if validator.validate(data):
        return {"valid": True, "data": data}
    else:
        return {"valid": False, "error": validator.errors}

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
    
    elif isinstance(errors,str):
        messages.append(errors)
    return messages

     

validators_func_dict = {
    "find_min" : find_min,
}
def validators_func(slug:str,testcases:List[str]):
    if slug in validators_func_dict:
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