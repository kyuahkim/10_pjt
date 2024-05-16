from django.urls import path
from . import views


app_name = 'products'
urlpatterns = [
    path('save-deposit-products/', views.save_deposit_products, name="save_deposit_products"),
]