from django.db import models
from nomadgram.users import models as user_models
from nomadgram.images import models as image_models
from django.contrib.humanize.templatetags.humanize import naturaltime
# Create your models here.


class Notifications(image_models.TimeStampedModel):

    TYPE_CHOICES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow')

    )

    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, related_name="creator")
    to = models.ForeignKey(user_models.User, on_delete=models.CASCADE, related_name="to")
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    image = models.ForeignKey(image_models.Image, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return 'From : {} - To : {}'.format(self.creator, self.to)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)
