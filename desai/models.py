import datetime
from django.db import models
from django.utils import timezone


class Skill(models.Model):
    def recentl(self):
        return self.skill_date >= timezone.now() - datetime.timedelta(days=1)

    skill_id = models.AutoField(primary_key=True)
    skill_name = models.CharField(max_length=200)
    skill_priority = models.IntegerField(default=99)
    skill_date = models.DateTimeField(default=timezone.now)


class SkillDetail(models.Model):
    detail_id = models.AutoField(primary_key=True)
    skill_foreign = models.ForeignKey(Skill, on_delete=models.CASCADE)
    detail_name = models.CharField(max_length=200)
    detail_description = models.TextField(max_length=500, blank='TRUE', null='TRUE')
    detail_priority = models.IntegerField(default=99)
    detail_date = models.DateTimeField(default=timezone.now)
