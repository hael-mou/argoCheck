# 📦 AgroChek

> Une plateforme simple où tout le monde peut découvrir des produits, voir ce que les autres en pensent, et partager sa propre expérience.

---

## 💡 C'est quoi AgroCheck ?

Vous êtes-vous déjà demandé si un produit valait vraiment le coup avant de l'acheter ?

**AgroCheck** est une application web qui répond exactement à cette question. Elle rassemble des avis réels de vraies personnes et les affiche de manière claire et honnête — pas de faux scores, pas d'avis cachés.

---

## ✨ Qu'est-ce qu'on peut faire avec ?

### 🔍 Parcourir les produits
Quand vous ouvrez l'application, vous voyez une liste de produits. Chacun affiche son nom, sa catégorie, et une note moyenne basée sur les avis des utilisateurs.

### 🔎 Rechercher & Filtrer
Vous pouvez rechercher un produit par son nom, ou affiner les résultats par :
- **Catégorie** — pour ne voir que les produits d'un groupe précis
- **Niveau de note** — choisissez entre les produits *Mauvais*, *Bons* ou *Excellents*

### ⭐ Voir le profil complet d'un produit
Cliquez sur n'importe quel produit pour ouvrir sa page de détail. Vous y trouverez :
- Une description complète du produit
- Sa note globale et ce qu'elle signifie (Mauvais / Bon / Excellent)
- La répartition du nombre de personnes ayant donné 1, 2, 3, 4 ou 5 étoiles
- Tous les avis laissés par les autres utilisateurs, avec leur nom, la date et leur commentaire

### ✍️ Écrire votre propre avis
Sur chaque page produit, vous pouvez cliquer sur **"Écrire un avis"** et partager :
- Votre prénom
- Une note de 1 à 5 étoiles
- Un commentaire sur votre expérience

> Vous ne pouvez laisser qu'un seul avis par produit — pour que tout reste juste et honnête.

### 🏆 Découvrir les meilleurs produits
La page d'accueil affiche aussi une section **"Mieux notés"** en bas de page, avec les produits que les utilisateurs ont le plus appréciés — un excellent point de départ si vous ne savez pas par où commencer.

---

## 🚀 Comment lancer le projet

L'application a deux parties qui doivent tourner en même temps : le **serveur** (qui gère les données) et l'**interface** (ce que vous voyez dans votre navigateur).

---

### Étape 1 — Démarrer le serveur

Ouvrez un terminal et allez dans le dossier `backend` :

```bash
cd backend
```

Créez un environnement isolé pour garder les choses propres :

```bash
python -m venv venv
source venv/bin/activate        # Mac / Linux
venv\Scripts\activate           # Windows
```

Installez ce dont le serveur a besoin :

```bash
pip install django djangorestframework django-cors-headers
```

Préparez la base de données :

```bash
python manage.py migrate
```

Créez votre compte administrateur (vous en aurez besoin pour ajouter des produits) :

```bash
python manage.py createsuperuser
```

Lancez le serveur :

```bash
python manage.py runserver
```

Le serveur tourne maintenant sur **http://localhost:8000**

---

### Étape 2 — Démarrer l'interface

Ouvrez un deuxième terminal et allez dans le dossier `frontend` :

```bash
cd frontend
npm install
npm run dev
```

L'application est maintenant accessible dans votre navigateur à **http://localhost:3000**

---

## 🛠️ Comment ajouter des produits

Une fois les deux parties lancées :

1. Rendez-vous sur **http://localhost:8000/admin**
2. Connectez-vous avec le compte administrateur que vous avez créé
3. De là, vous pouvez ajouter des **catégories** et des **produits** — donnez à chaque produit un nom, une description, un lien d'image et une catégorie

Dès qu'un produit est ajouté, il apparaît sur l'application et tout le monde peut le voir et le noter.

---

## 🗺️ Les pages en un coup d'œil

| Page | Ce qu'elle fait |
|------|-----------------|
| **Accueil** `/` | Affiche tous les produits, la barre de recherche, les filtres et la section "Mieux notés" |
| **Produit** `/product/[id]` | Détails complets du produit, répartition des notes, tous les avis et le formulaire pour en écrire un |

---

C'est tout. Pas besoin de créer un compte pour parcourir les produits ou laisser un avis — ouvrez simplement l'application et commencez à explorer.