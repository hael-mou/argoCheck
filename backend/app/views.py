
from django.db import IntegrityError
from django.core.cache import cache
from rest_framework.generics import ListAPIView, RetrieveAPIView
from app.models import Category, Product
from app.serializers import CategorySerializer, ProductDetailSerializer, ProductListSerializer, ReviewSerializer
from django.db.models import Avg, Count, Value, FloatField
from django.db.models.functions import Coalesce
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


# === category list view : ===========================================
class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# === product pagination : ===========================================
class ProductPagination(PageNumberPagination):
    page_size = 8
    max_page_size = 100


# === product list view : ============================================
class ProductListView(ListAPIView):
    serializer_class = ProductListSerializer
    pagination_class = ProductPagination
    
    def get_rating_level(self, rating):
        if rating <= 2.5:
            return "bad"
        if rating < 4:
            return "good"
        return "excellent"
    
    def get_queryset(self):
        queryset = (
            Product.objects
            .select_related("category")
            .prefetch_related("reviews")
            .annotate(
                total_reviews=Count("reviews"),
                average_rating=Coalesce(Avg("reviews__rating"), Value(0.0), output_field=FloatField())
            )
            .order_by("-created_at")
        )
    
        search = self.request.query_params.get("search")
        category = self.request.query_params.get("category")
        rating = self.request.query_params.get("rating")

        if search:
            queryset = queryset.filter(name__icontains=search)

        if category:
            queryset = queryset.filter(category__id=category)
        
        try:
            if rating:
                if (rating == "bad"):
                    queryset = queryset.filter(average_rating__lte=2.5)
                elif (rating == "good"):
                    queryset = queryset.filter(average_rating__gt=2.5).filter(average_rating__lte=3.9)
                elif (rating == "excellent"):
                    queryset = queryset.filter(average_rating__gt=3.9)
                queryset = queryset.order_by("-average_rating")
        except ValueError:
            pass

        return queryset


# === product details view : ============================================
class ProductDetailView(RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    lookup_field     =  "uuid"

    def get_queryset(self):
        return (
            Product.objects
            .select_related("category")
            .prefetch_related("reviews")
            .annotate(
                total_reviews=Count("reviews"),
                average_rating=Avg("reviews__rating")
            )
        )


# === review create view : ============================================
class ReviewCreateView(APIView):
    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        ip_address = self.get_client_ip(request)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            serializer.save(ip_address=ip_address)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"detail": "Vous avez déjà soumis une critique pour ce produit."}, status=status.HTTP_400_BAD_REQUEST)


    def get_client_ip(self, request):
        xff = request.META.get("HTTP_X_FORWARDED_FOR")
        ip = xff.split(",")[0] if xff else request.META.get("REMOTE_ADDR")
        return ip or "0.0.0.0"
