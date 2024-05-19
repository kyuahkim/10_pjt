from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'products',views.DepositProductsViewSet)

app_name = 'products'
urlpatterns = [
    path('save-deposit-products/', views.save_deposit_products, name="save_deposit_products"),
    path('get_exchange_rate/',views.get_exchange_rate, name="get_exchange_rate"),
    path('deposit-products-options/<str:fin_prdt_cd>/', views.deposit_products_options, name="deposit_products_options"),
    path('',include(router.urls)),
]