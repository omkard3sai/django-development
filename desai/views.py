from django.http import HttpResponse
from .models import Skill, SkillDetail, SkillCategory
from django.template import loader


def index(request):
    template = loader.get_template('desai/index.html')
    skill_list = Skill.objects.order_by('skill_priority')
    skill_category_list = SkillCategory.objects.order_by('skill_category_priority')

    for i, skill in enumerate(skill_list):
        setattr(skill_list[i], 'details', SkillDetail.objects
                .filter(skill_foreign_id=skill.skill_id)
                .order_by('detail_priority'))

    context = {'skill_list': skill_list,'skill_category_list': skill_category_list}
    return HttpResponse(template.render(context, request))
