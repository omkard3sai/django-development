from django.http import HttpResponse
from .models import Skill, SkillDetail, SkillCategory, Feedback
from django.template import loader
from django.utils import timezone
import json


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


def feedback(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        msg = request.POST.get('msg')
        feebackobject = Feedback(feedback_name=name, feedback_email=email, feedback_msg=msg, feedback_date=timezone.now)
        feebackobject.save()
        response_data = 'Success'
        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        response_data = 'Failed'
        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )

