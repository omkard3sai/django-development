from django.db import models
from django.utils import timezone


class SkillCategory(models.Model):
    def __str__(self):
        return self.skill_category_name

    skill_category_id = models.AutoField(primary_key=True)
    skill_category_name = models.CharField(max_length=200)
    skill_category_priority = models.IntegerField(default=99)
    skill_category_date = models.DateTimeField(default=timezone.now)


class Skill(models.Model):
    def __str__(self):
        return self.skill_name

    skill_id = models.AutoField(primary_key=True)
    skill_name = models.CharField(max_length=200)
    skill_class = models.CharField(max_length=100)
    skill_categories = models.CharField(max_length=200)
    skill_priority = models.IntegerField(default=99)
    skill_date = models.DateTimeField(default=timezone.now)


class SkillDetail(models.Model):
    def __str__(self):
        return self.detail_name

    detail_id = models.AutoField(primary_key=True)
    skill_foreign = models.ForeignKey(Skill, on_delete=models.CASCADE)
    detail_name = models.CharField(max_length=200)
    detail_class = models.CharField(max_length=100)
    detail_categories = models.CharField(max_length=200)
    detail_description = models.TextField(max_length=500, blank='TRUE', null='TRUE')
    detail_priority = models.IntegerField(default=99)
    detail_date = models.DateTimeField(default=timezone.now)
