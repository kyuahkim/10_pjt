from django.db import models
from django.contrib.auth.models import AbstractUser
from products.models import DepositProducts

# Create your models here.
class User(AbstractUser) :
    username = models.CharField(max_length=30, unique=True)
    nickname = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=254, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    # 현재 소유한 금액
    money = models.IntegerField(blank=True, null=True)
    # 연봉
    salary = models.IntegerField(blank=True, null=True)
    # 가입한 상품 목록 리스트를 ,로 구분된 문자열로 저장함
    financial_products = models.TextField(blank=True, null=True)
    
    # 기업 모델을 만들 경우 -> 연봉, 나이, 현재 소유 금액등의 fields는 필요없음 -> 새로운 모델을 생성해야 함
    # # 기업인지 개인인지 -> 상품 등록 여부를 결정
    # is_company = models.BooleanField(default=False)