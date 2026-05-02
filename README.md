# 📦 AgroChek

> Une plateforme simple où tout le monde peut découvrir des produits, voir ce que les autres en pensent, et partager sa propre expérience.

---

## 💡 C'est quoi AgroCheck ?

Vous êtes-vous déjà demandé si un produit valait vraiment le coup avant de l'acheter ?

**AgroCheck** est une application web qui répond exactement à cette question. Elle rassemble des avis réels de vraies personnes et les affiche de manière claire et honnête — pas de faux scores, pas d'avis cachés.

## 💡 Visitez le site en ligne
Vous pouvez visiter le site en ligne ici : [agrocheck](http://http://137.184.98.100/)


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

## 🚀 Comment lancer le projet local

L'application a deux parties qui doivent tourner en même temps : le **serveur** (qui gère les données) et l'**interface** (ce que vous voyez dans votre navigateur).

---

### Étape 1 — setup du serveur backend 
```bash
cd backend
uv sync
uv run python manage.py migrate  
uv run python manage.py seed_data
```

### Etape 2 — Démarrer le serveur backend
```bash
uv run python manage.py runserver 8000
```
Le serveur tourne maintenant sur **http://localhost:8000**

---

### Étape 3 — setup de l'interface frontend

```bash
cd frontend
npm install
npm run build
```

### Etape 4 — Démarrer l'interface frontend

```bash
npm run start -- --port 3000
```
L'application est maintenant accessible dans votre navigateur à **http://localhost:3000**

---

## 🗺️ Les pages en un coup d'œil

| Page | Ce qu'elle fait |
|------|-----------------|
| **Accueil** `/` | Affiche tous les produits, la barre de recherche, les filtres et la section "Mieux notés" |
| **Produit** `/product/[id]` | Détails complets du produit, répartition des notes, tous les avis et le formulaire pour en écrire un |

---

C'est tout. Pas besoin de créer un compte pour parcourir les produits ou laisser un avis — ouvrez simplement l'application et commencez à explorer.
