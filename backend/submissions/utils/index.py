import re

LANG_PATTERNS = {
    "java": r"^\s*import\s.+",              
    "cpp": r"^\s*#include\s.+|^\s*using\s+namespace\s.+",  
    "python": r"^\s*import\s.+|^\s*from\s.+", 
    "javascript": r"^\s*import\s.+|^\s*require\(.+\)" 
}

def get_formated_code(user_code: str, driver_code: str, lang: str) -> str:
    lines = f"{user_code}\n{driver_code}".splitlines()
    
    if lang not in LANG_PATTERNS:
        return f"{user_code}\n{driver_code}"
    
    pattern = re.compile(LANG_PATTERNS[lang])
    
    modules_imports = []
    code_lines = []
    
    for line in lines:
        if pattern.match(line):
            modules_imports.append(line)
        else:
            code_lines.append(line)
    
    formatted_code = "\n".join(modules_imports + [""] + code_lines)
    return formatted_code
