from django.http import HttpResponse


def index(request):
    html = "<h1>HELLO WORLD</h1><br>"
    html += "<h4>Project View</h4>"
    return HttpResponse(html)
