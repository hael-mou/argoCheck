import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from app.models import Category, Product, Review


PRODUCTS_DATA = [
    {
        "name": "Biofix Agroneem",
        "category": "pesticides",
        "description": "Biopesticide à large spectre dérivé de l'huile de neem. Contrôle les pucerons, mouches blanches et acariens.",
        "image": "https://5.imimg.com/data5/SELLER/Default/2021/4/GB/RK/IL/29525315/ss-500x500.jpg"
    },
    {
        "name": "Biofix Mitlar Plus",
        "category": "pesticides",
        "description": "Acaricide ciblé pour contrôler les acariens sur cultures maraîchères et fruitières.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlPYhqjUhuumueyIL0027AHY5IME1SoSLwTg&s"
    },
    {
        "name": "Chariot Pulvérisateur Batterie",
        "category": "equipment",
        "description": "Pulvérisateur électrique sur chariot couvrant de grandes surfaces avec pression constante.",
        "image": "https://www.geotech-pro.com/wp-content/uploads/2022/05/pompa-irroratrice-carrellata-elettrica-a-batteria-geotech-sp-320-e-agrieuro_10712_1-1.jpg"
    },
    {
        "name": "Engrais NPK Organique",
        "category": "fertilizers",
        "description": "Mélange NPK organique équilibré (10-10-10) enrichi en oligo-éléments pour améliorer le rendement.",
        "image": "https://m.media-amazon.com/images/I/61hDWfj3VqL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        "name": "Kit d'Irrigation Goutte-à-Goutte",
        "category": "equipment",
        "description": "Système complet d'irrigation goutte-à-goutte couvrant jusqu'à 1000 m².",
        "image": "https://ae01.alicdn.com/kf/S006e9d89fdfa422fa6443236626fdc15B.jpg"
    },
    {
        "name": "Biofix Nématocide",
        "category": "pesticides",
        "description": "Nématocide biologique à base de Bacillus thuringiensis contre les nématodes galligènes.",
        "image": "https://www.kisanshop.in/uploads/pseudoguard-pseudomonas-biopesticide.jpg"
    },
    {
        "name": "Semences Tomate Hybride F1",
        "category": "seeds",
        "description": "Semences hybrides à haut rendement résistantes aux maladies avec longue conservation.",
        "image": "https://graines-lepaysan.com/wp-content/uploads/2023/04/3419199804035-Recto.jpg"
    },
    {
        "name": "Pulvérisateur Manuel 5L",
        "category": "equipment",
        "description": "Pulvérisateur manuel 5 litres adapté aux petits jardins.",
        "image": "https://cdnprd.marjanemall.ma/cn0picture0products0mm/efac7889-b5e4-4a32-b1ca-c2eea37d073d.webp"
    },
    {
        "name": "Biofix Fongicide WP",
        "category": "pesticides",
        "description": "Fongicide en poudre mouillable contre oïdium, mildiou et brûlure foliaire.",
        "image": "https://www.kisanshop.in/uploads/biofix-tricho-guard-fungicides.jpg"
    },
    {
        "name": "Compost Organique Premium",
        "category": "organic",
        "description": "Compost organique mûr enrichissant la structure du sol et l'activité microbienne.",
        "image": "https://i5.walmartimages.com/asr/e83ce405-4328-4f7e-bfe8-57914bb09e55.ca0a8763ee9a85070ef33d1c9443221f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
    },
    {
        "name": "Mélange Foliaire Oligoéléments",
        "category": "fertilizers",
        "description": "Solution complète d'oligoéléments (zinc, bore, manganèse, fer) pour application foliaire.",
        "image": "https://s.alicdn.com/@sc04/kf/H32da48eae2eb4447ad91a5116ef1a51dx/Trace-Element-Liquid-Fertilizer-High-Boron-50g-L-and-Molybdenum-for-Flowering-and-Pod-Setting.jpg_300x300.jpg"
    },
    {
        "name": "Biofix Herbicide Systémique",
        "category": "pesticides",
        "description": "Herbicide systémique de post-levée pour contrôle large des mauvaises herbes.",
        "image": "https://www.agrileader.fr/10066-large_default/0405400-cent-7.jpg"
    },
    {
        "name": "Film de Serre UV 200µm",
        "category": "equipment",
        "description": "Film polyéthylène stabilisé UV avec durabilité de 3 ans (200 microns).",
        "image": "https://sc04.alicdn.com/kf/H50007810b43e4ffbb39ba01360d5e63e5.jpg"
    },
    {
        "name": "Semences Poivron Hybride F1",
        "category": "seeds",
        "description": "Semences hybrides de poivron tolérantes aux maladies, adaptées serre et plein champ.",
        "image": "https://graines-caillard.com/upload/produits/PFCC14619-piment-doux-poivron-samson-hybride-f1.jpg"
    },
    {
        "name": "Biofix Bio-Insecticide",
        "category": "pesticides",
        "description": "Bio-insecticide à base de spinosad contre chenilles, thrips et mineuses.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9NaCwLPQW8rIhJ845cA98AMgwtKNS9-60yg&s"
    },
    {
        "name": "Testeur pH & CE du Sol",
        "category": "equipment",
        "description": "Testeur numérique du sol pour pH et conductivité électrique.",
        "image": "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/68/218576/1.jpg?4221"
    }
]

# 🔥 UNIQUE REVIEWS PER PRODUCT (NO SHARING)
PRODUCT_REVIEWS = {
    "Biofix Agroneem": [
        {"name": "Karim L.", "rating": 5, "comment": "Après 5 jours, les pucerons ont presque disparu. Très satisfait."},
        {"name": "Salma H.", "rating": 4, "comment": "Bon produit globalement, mais l’odeur est un peu forte."},
        {"name": "Jean P.", "rating": 3, "comment": "Efficace sur petites infestations, moins sur les cas sévères."},
        {"name": "Mounir S.", "rating": 5, "comment": "Produit naturel qui fait le job, je recommande pour cultures bio."},
        {"name": "Nora A.", "rating": 2, "comment": "Résultat lent chez moi, peut-être mauvaise utilisation."},
        {"name": "Hamid Z.", "rating": 4, "comment": "Bon rapport qualité/prix, fonctionne bien sur mes courgettes."},
        {"name": "Mohammed B.", "rating": 1, "comment": "Pas assez efficace, je recommande autre chose."},
        {"name": "Fatima M.", "rating": 3, "comment": "Résultat satisfaisant, mais pas parfait."},
    ],

    "Biofix Mitlar Plus": [
        {"name": "Rachid F.", "rating": 4, "comment": "Réduction visible des acariens après une semaine."},
        {"name": "Imane K.", "rating": 5, "comment": "Très efficace en serre, résultat rapide et durable."},
        {"name": "Luis G.", "rating": 2, "comment": "Pas assez puissant sur une grosse infestation."},
        {"name": "Samira B.", "rating": 3, "comment": "Correct mais nécessite plusieurs applications."},
        {"name": "Hicham D.", "rating": 4, "comment": "Facile à utiliser, bon produit dans l’ensemble."},
        {"name": "Elena V.", "rating": 1, "comment": "Je n’ai vu presque aucun changement après 10 jours."},
    ],

    "Chariot Pulvérisateur Batterie": [
        {"name": "Abdelkader M.", "rating": 3, "comment": "Fonctionne bien mais batterie se vide vite sur grandes surfaces."},
        {"name": "Julie R.", "rating": 4, "comment": "Très pratique, m’a fait gagner beaucoup de temps."},
        {"name": "Yassine O.", "rating": 2, "comment": "Pression irrégulière après quelques utilisations."},
        {"name": "Claire T.", "rating": 5, "comment": "Excellent outil, robuste et efficace."},
        {"name": "Mohamed E.", "rating": 1, "comment": "Problème technique dès la première semaine."},
        {"name": "Nabil A.", "rating": 3, "comment": "Correct mais nécessite entretien régulier."},
        {"name": "Fatouma G.", "rating": 4, "comment": "Bon produit, fonctionne parfaitement."},
        {"name": "Mehdi C.", "rating": 2, "comment": "Résultat lent, j’attendais mieux."},
        {"name": "Sanaa L.", "rating": 4, "comment": "Bon produit, surtout pour cultures bio."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
    ],

    "Engrais NPK Organique": [
        {"name": "Driss B.", "rating": 5, "comment": "Amélioration nette du rendement, très bon produit."},
        {"name": "Leila S.", "rating": 4, "comment": "Mes plantes sont plus vertes et vigoureuses."},
        {"name": "Paul M.", "rating": 3, "comment": "Résultat correct mais pas spectaculaire."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
        {"name": "Othmane K.", "rating": 2, "comment": "Effet lent, j’attendais mieux."},
        {"name": "Sanaa L.", "rating": 4, "comment": "Bon produit, surtout pour cultures bio."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
    ],
    "Kit d'Irrigation Goutte-à-Goutte": [
        {"name": "Driss B.", "rating": 5, "comment": "Amélioration nette du rendement, très bon produit."},
        {"name": "Leila S.", "rating": 4, "comment": "Mes plantes sont plus vertes et vigoureuses."},
        {"name": "Paul M.", "rating": 3, "comment": "Résultat correct mais pas spectaculaire."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
        {"name": "Othmane K.", "rating": 2, "comment": "Effet lent, j’attendais mieux."},
        {"name": "Sanaa L.", "rating": 4, "comment": "Bon produit, surtout pour cultures bio."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
    ],
    "Biofix Bio-Insecticide": [
        {"name": "Driss B.", "rating": 5, "comment": "Amélioration nette du rendement, très bon produit."},
        {"name": "Leila S.", "rating": 4, "comment": "Mes plantes sont plus vertes et vigoureuses."},
        {"name": "Paul M.", "rating": 3, "comment": "Résultat correct mais pas spectaculaire."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
        {"name": "Othmane K.", "rating": 2, "comment": "Effet lent, j’attendais mieux."},
        {"name": "Sanaa L.", "rating": 4, "comment": "Bon produit, surtout pour cultures bio."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
    ],
    "Testeur pH & CE du Sol": [
        {"name": "Driss B.", "rating": 5, "comment": "Amélioration nette du rendement, très bon produit."},
        {"name": "Leila S.", "rating": 4, "comment": "Mes plantes sont plus vertes et vigoureuses."},
        {"name": "Paul M.", "rating": 3, "comment": "Résultat correct mais pas spectaculaire."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
        {"name": "Othmane K.", "rating": 2, "comment": "Effet lent, j’attendais mieux."},
        {"name": "Sanaa L.", "rating": 4, "comment": "Bon produit, surtout pour cultures bio."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
    ],
    "Biofix Herbicide Systémique": [
        {"name": "Driss B.", "rating": 5, "comment": "Amélioration nette du rendement, très bon produit."},
        {"name": "Leila S.", "rating": 4, "comment": "Mes plantes sont plus vertes et vigoureuses."},
        {"name": "Paul M.", "rating": 3, "comment": "Résultat correct mais pas spectaculaire."},
        {"name": "Fatima Z.", "rating": 5, "comment": "Excellent pour enrichir le sol naturellement."},
        {"name": "Othmane K.", "rating": 2, "comment": "Effet lent, j’attendais mieux."},
        {"name": "Sanaa L.", "rating": 4, "comment": "Bon produit, surtout pour cultures bio."},
    ]
}

class Command(BaseCommand):
    help = "Seed products with UNIQUE realistic reviews"

    def handle(self, *args, **kwargs):
        self.stdout.write("Reset DB...")

        Review.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()

        now = timezone.now()

        # ======================
        # Categories
        # ======================
        categories = {}
        for c in ["pesticides", "equipment", "fertilizers", "seeds", "organic"]:
            categories[c] = Category.objects.create(
                name=c,
                slug=c
            )

        # ======================
        # Products
        # ======================
        for i, p in enumerate(PRODUCTS_DATA):

            product = Product.objects.create(
                name=p["name"],
                category=categories[p["category"]],
                description=p["description"],
                image_url=p["image"],
                created_at=now - timedelta(days=i * 2)
            )

            # ======================
            # UNIQUE REVIEWS PER PRODUCT
            # ======================
            reviews = PRODUCT_REVIEWS.get(p["name"], [])

            for review_index, r in enumerate(reviews, start=1):
                Review.objects.create(
                    product=product,
                    name=r["name"],
                    rating=r["rating"],
                    comment=r["comment"],
                    ip_address=f"192.168.{i}.{review_index}",
                    created_at=now - timedelta(days=random.randint(1, 60))
                )

        self.stdout.write(self.style.SUCCESS("Seeding done with unique reviews 🚀"))
