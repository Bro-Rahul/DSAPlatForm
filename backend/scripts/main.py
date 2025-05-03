from problems.models import Problems

def query():
    data = Problems.objects.prefetch_related("tags")
        
    print(data)

def run():
    query()