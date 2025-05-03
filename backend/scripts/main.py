from problems.models import Problems
from users.models import Users

def query():
    data = Users.objects.get(email="goku@gmail.com")

    print(data.id)

def run():
    query()