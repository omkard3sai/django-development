from django.http import HttpResponse
from .models import Skill, SkillDetail
from django.template import loader


def index(request):
    template = loader.get_template('desai/index.html')
    skill_list = Skill.objects.order_by('skill_priority')
    skill_detail_list = SkillDetail.objects.order_by('skill_id').order_by('detail_priority')

    for s in skill_list:
        s.details = []
        for d in skill_detail_list:
            print(d.skill_foreign_id)
            if s.skill_id == d.skill_foreign_id:
                temp = {
                    'detail_name': d.detail_name,
                    'detail_description': d.detail_description,
                }
                s.details.append(temp)

    context = {'skill_list': skill_list}
    return HttpResponse(template.render(context, request))
