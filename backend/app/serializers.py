
from rest_framework import serializers
from . import models

# === category serializer : ============================================
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = "__all__"
        read_only_fields = ["slug", "id"]

# === product list serializer : ============================================
class ProductListSerializer(serializers.ModelSerializer):
    total_reviews  = serializers.IntegerField(read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    category_name  = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = models.Product
        fields = "__all__"
        read_only_fields = ["uuid", "created_at"]


# === review serializer : ============================================
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        fields = "__all__"
        read_only_fields = ["uuid", "created_at", "ip_address"]


# === product detail serializer : ============================================
class ProductDetailSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer( many=True, read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    total_reviews = serializers.IntegerField(read_only=True)
    average_rating = serializers.FloatField(read_only=True)

    class Meta:
        model = models.Product
        fields = "__all__"
        read_only_fields = ["uuid", "created_at"]
