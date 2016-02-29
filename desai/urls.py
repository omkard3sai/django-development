from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^projects/', include('projects.urls')),
    url(r'^admin/', admin.site.urls),
]