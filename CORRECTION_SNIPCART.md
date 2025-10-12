# 🔧 Correction Erreur Snipcart - Prix des Produits

## ❌ Le Problème

L'erreur que vous avez vue :
```
"Le prix de produits dans votre panier semble avoir changé"
```

**Cause :** Snipcart essaie de vérifier les prix en crawlant vos URLs de produits, mais ne peut pas les atteindre car les URLs étaient **relatives** (`/boutique`) au lieu d'**absolues** (`https://votredomaine.fr/...`).

---

## ✅ La Solution Appliquée

J'ai corrigé **tous les 6 produits** en remplaçant :
- ❌ `data-item-url="/boutique"`
- ✅ `data-item-url="https://votresite.fr/index.html"`

---

## 🚨 ACTION REQUISE : Remplacer l'URL

**⚠️ IMPORTANT :** Vous devez remplacer `https://votresite.fr` par votre **vraie URL**.

### Cas 1 : Site Déjà en Ligne

Si le site est hébergé sur LWS (ex: `https://fleursdenila.fr`), faites ceci :

**Dans `index.html`, rechercher/remplacer (6 occurrences) :**

```
Rechercher : https://votresite.fr
Remplacer par : https://VOTRE-VRAI-DOMAINE.fr
```

**Exemple concret :**
```html
<!-- AVANT -->
data-item-url="https://votresite.fr/index.html"

<!-- APRÈS -->
data-item-url="https://fleursdenila.fr/index.html"
```

### Cas 2 : Site en Local (Test)

Si vous testez en local (localhost), vous avez 2 options :

#### Option A : Garder URL Placeholder (RECOMMANDÉ)
- Laissez `https://votresite.fr`
- Snipcart affichera toujours l'avertissement
- Mais **ça marchera quand même** en mode TEST
- Changez l'URL avant de passer en LIVE

#### Option B : Désactiver Validation Temporaire
Ajoutez cette ligne dans Snipcart (ligne 1020) :

```html
<div id="snipcart" 
     data-api-key="MmVjYTBhZDctM2M3ZC00MGVlLTk2ZDUtY2QyN2FiOWI2MDhiNjM4OTU4NjEzNDI2NTAyMDg0" 
     data-config-modal-style="side"
     data-config-add-product-behavior="alwaysAskForQuantity"
     hidden>
</div>
```

---

## 📋 Checklist de Mise en Production

Avant de passer en LIVE, vérifiez :

### ✅ 1. URLs Produits
```bash
# Cherchez dans index.html :
https://votresite.fr
```
→ Doit être remplacé par votre vrai domaine

### ✅ 2. URLs Images
```bash
# Cherchez dans index.html :
data-item-image="https://votresite.fr/images/
```
→ Doit aussi pointer vers votre vrai domaine

### ✅ 3. HTTPS Activé
- Le site DOIT être en HTTPS (certificat SSL)
- Sur LWS : panneau → SSL → Activer Let's Encrypt (gratuit)

### ✅ 4. Fichier index.html Accessible
- Testez : `https://votredomaine.fr/index.html`
- Doit s'afficher correctement

### ✅ 5. Images Accessibles
- Testez : `https://votredomaine.fr/images/bouquet2.jpg`
- Doit s'afficher

---

## 🔍 Comment Faire le Remplacement

### Méthode 1 : Rechercher/Remplacer dans l'Éditeur

**Dans VSCode / Cursor / Sublime :**
1. Ouvrir `index.html`
2. Appuyer sur `Cmd+F` (Mac) ou `Ctrl+F` (Windows)
3. Rechercher : `https://votresite.fr`
4. Remplacer par : `https://VOTRE-DOMAINE.fr`
5. Cliquer sur "Remplacer tout" (12 occurrences normalement)
6. Sauvegarder

### Méthode 2 : Ligne de Commande (Advanced)

```bash
cd /Users/baptistegrincourtdeflogny/Desktop/ManonDrySite

# Remplacer votresite.fr par le vrai domaine
sed -i '' 's/votresite\.fr/fleursdenila.fr/g' index.html
```

---

## 🧪 Tester la Correction

### 1. Ouvrir le Site
```
https://votredomaine.fr/index.html
```

### 2. Ouvrir la Console du Navigateur
- `F12` ou `Cmd+Option+I`
- Onglet "Console"

### 3. Ajouter un Produit au Panier
- Cliquez sur "Ajouter au panier"
- Le panier Snipcart s'ouvre

### 4. Vérifier qu'il n'y a Plus d'Erreur
- Pas de message rouge
- Le prix s'affiche correctement
- Vous pouvez procéder au checkout

---

## 💡 Pourquoi Snipcart Fait Ça ?

**C'est une sécurité anti-fraude :**

1. Client ajoute produit à 45€ dans le panier
2. Client modifie le prix côté navigateur (F12) → 1€
3. Client valide la commande
4. ❌ **MAIS** Snipcart crawle votre page produit
5. ✅ Snipcart compare : prix panier vs prix page
6. ✅ Si différent → bloque la commande

**C'est pour ça qu'il faut une URL accessible publiquement.**

---

## 🎯 Résumé Action Immédiate

### SI LE SITE EST DÉJÀ EN LIGNE :

1. **Ouvrir** `index.html`
2. **Rechercher** : `https://votresite.fr`
3. **Remplacer par** : `https://VOTRE-VRAI-DOMAINE.fr` (12 fois)
4. **Sauvegarder** et **re-uploader** sur LWS
5. **Tester** un achat

### SI LE SITE EST EN LOCAL :

1. **Laissez** `https://votresite.fr` pour l'instant
2. **Testez** avec la clé API de test
3. L'avertissement apparaîtra mais **ça fonctionnera**
4. **Changez l'URL** juste avant de passer en LIVE

---

## 🆘 Si Ça Ne Marche Toujours Pas

### Vérifiez :

1. **HTTPS activé** ?
   ```
   https://votredomaine.fr (pas http://)
   ```

2. **index.html accessible** ?
   ```
   https://votredomaine.fr/index.html
   ```

3. **Prix identiques** page vs code ?
   ```
   Prix sur la page : 45,00 €
   Prix dans le code : data-item-price="45.00"
   → Doivent correspondre !
   ```

4. **Console du navigateur** (F12) :
   ```
   Erreur rouge ? Copiez-moi le message
   ```

---

## 📞 Support

Si vous avez toujours l'erreur après avoir changé les URLs :

1. Envoyez-moi :
   - L'URL de votre site
   - Une capture d'écran de l'erreur
   - La console (F12 → onglet Console)

2. Ou contactez le support Snipcart :
   - https://docs.snipcart.com/v3/
   - support@snipcart.com

---

**En résumé : Remplacez `https://votresite.fr` par votre vraie URL et ça marchera ! 🚀**

