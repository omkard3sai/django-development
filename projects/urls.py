from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^desai/', include('desai.urls')),
    url(r'^projects/', include('projects.urls')),
]
