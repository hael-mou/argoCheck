from django.urls import path
from . import views

urlpatterns = [
    path('products/categories/', views.CategoryListView.as_view(), name='category-list'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/<uuid:uuid>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('products/reviews/', views.ReviewCreateView.as_view(), name='product-review-create'),
]
