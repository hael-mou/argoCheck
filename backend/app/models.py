
import uuid
from django.db import models

# === categories : ========================================
class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name
    
# === products : ==========================================
class Product(models.Model):
    uuid        = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image_url   = models.URLField(blank=True, null=True)
    name        = models.CharField(max_length=255)
    category    = models.ForeignKey(Category, related_name="products", on_delete=models.CASCADE)
    description = models.TextField()
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# === reviews : ===========================================
class Review(models.Model):
    uuid        = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product     = models.ForeignKey(Product, related_name="reviews", on_delete=models.CASCADE)
    name        = models.CharField(max_length=100)
    rating      = models.PositiveSmallIntegerField()
    comment     = models.TextField(blank=True)
    ip_address  = models.GenericIPAddressField(null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("product", "ip_address")

    def __str__(self):
        return f"{self.name} - {self.rating}"
