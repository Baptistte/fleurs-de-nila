# 📧 Configuration des Emails Snipcart

## 🎯 Objectif

Configurer les emails automatiques pour que :
- ✅ Le **client** reçoive une **confirmation de commande** et une **facture** par email
- ✅ Vous (le marchand) receviez une **notification** à chaque nouvelle commande
- ✅ Les emails soient **personnalisés** avec votre branding

---

## 📋 Emails Automatiques Disponibles

Snipcart envoie automatiquement **4 types d'emails** :

### 1. **Confirmation de Commande** (au client)
- Envoyé immédiatement après le paiement
- Contient le récapitulatif de la commande
- Numéro de commande, produits, prix, adresse

### 2. **Facture** (au client)
- Facture PDF jointe ou intégrée
- Détail des produits et montants
- Informations de paiement

### 3. **Notification Marchand** (à vous)
- Alerte de nouvelle commande
- Résumé des produits commandés
- Informations client pour préparer la livraison

### 4. **Email d'Expédition** (au client) - Optionnel
- Envoyé quand vous marquez la commande comme "expédiée"
- Contient le numéro de suivi si fourni

---

## ⚙️ Configuration dans le Dashboard Snipcart

### **Étape 1 : Accéder aux Paramètres Email**

1. Connectez-vous à https://app.snipcart.com
2. Allez dans **Settings** (Paramètres)
3. Cliquez sur **Email Notifications**

---

### **Étape 2 : Configurer les Emails Clients**

#### **A. Email de Confirmation**

**Activer l'email :**
- Par défaut : ✅ **Activé automatiquement**
- Ne nécessite aucune action

**Personnaliser le contenu :**
1. Settings → **Email Templates**
2. Sélectionnez **Order Confirmation**
3. Options disponibles :
   - Logo de votre boutique
   - Couleur d'accent
   - Message personnalisé
   - Pied de page

**Exemple de personnalisation :**
```
Logo : [Upload votre logo]
Couleur : #1a365d (bleu foncé)
Message : "Merci pour votre commande chez Les Fleurs de Nila !"
```

#### **B. Facture (Invoice)**

**Activer la facture PDF :**
1. Settings → **Invoice**
2. Toggle : ✅ **Enable invoice**
3. La facture sera jointe à l'email de confirmation

**Informations sur la facture :**
- Votre nom/entreprise
- Adresse
- Numéro SIRET (si applicable)
- TVA

**Configuration :**
```
Business Name: Les Fleurs de Nila
Address: 3 rue Auguste-Pellet, Nîmes, France
VAT Number: [Votre numéro de TVA si applicable]
```

---

### **Étape 3 : Configurer les Notifications Marchand**

#### **A. Email de Nouvelle Commande**

1. Settings → **Notifications**
2. Section **Merchant Notifications**
3. Entrez votre email professionnel :
   ```
   fleursdenila@icloud.com
   ```
4. Toggle : ✅ **Receive order notifications**

**Ce que vous recevrez :**
- Notification instantanée à chaque commande
- Détail des produits commandés
- Informations client (nom, email, adresse)
- Montant total

#### **B. Notifications Supplémentaires (Optionnel)**

Vous pouvez aussi recevoir :
- ✅ **Abandoned cart** (panier abandonné) - pour relancer les clients
- ✅ **Refund notifications** (remboursements)
- ✅ **Inventory alerts** (alertes de stock faible)

---

### **Étape 4 : Personnaliser les Templates d'Email**

#### **A. Ajouter Votre Logo**

1. Settings → **Email Templates**
2. Section **Branding**
3. **Upload logo** :
   - Format : PNG ou JPG
   - Taille recommandée : 200x80px
   - Fond transparent de préférence

#### **B. Choisir les Couleurs**

1. **Primary Color** : `#1a365d` (bleu profond)
2. **Accent Color** : `#bee3f8` (bleu clair)
3. Les boutons et liens utiliseront ces couleurs

#### **C. Personnaliser les Messages**

**Email de Confirmation :**
```
Bonjour {customer_name},

Merci pour votre commande chez Les Fleurs de Nila ! 🌸

Votre commande #{order_number} a bien été reçue et sera préparée avec soin.

Détails de votre commande :
{order_details}

Pour toute question : fleursdenila@icloud.com ou 04 34 39 04 29

À très bientôt,
L'équipe Les Fleurs de Nila
```

**Email d'Expédition (optionnel) :**
```
Bonjour {customer_name},

Bonne nouvelle ! Votre commande #{order_number} est en route ! 🚚

{tracking_info}

Merci de votre confiance,
Les Fleurs de Nila
```

---

### **Étape 5 : Tester les Emails**

#### **Mode Test**

1. Avec votre clé API de TEST actuelle
2. Faites une commande test sur le site
3. Utilisez une vraie adresse email (la vôtre)
4. Vérifiez que vous recevez :
   - ✅ Email de confirmation (client)
   - ✅ Email de notification (marchand)

**Carte de test Stripe :**
```
Numéro : 4242 4242 4242 4242
Date : n'importe quelle date future
CVC : n'importe quel code 3 chiffres
```

#### **Mode Live**

Une fois en production :
1. Passez à la clé API LIVE
2. Faites une vraie commande (petite)
3. Vérifiez tous les emails

---

## 📄 Contenu des Emails par Défaut

### **Email de Confirmation Client :**

```
Objet : Confirmation de commande #12345 - Les Fleurs de Nila

Bonjour [Nom du client],

Merci pour votre commande !

COMMANDE #12345
Date : 12 octobre 2025

PRODUITS :
- Bouquet Signature x1 ......... 45,00 €
  Message : "Joyeux anniversaire !"
  
SOUS-TOTAL ........................ 45,00 €
LIVRAISON ......................... 12,00 €
TOTAL ............................. 57,00 €

ADRESSE DE LIVRAISON :
[Nom]
[Adresse]
[Ville, Code postal]

PAIEMENT :
Carte bancaire •••• 4242
Payé le 12/10/2025

Questions ? Contactez-nous :
fleursdenila@icloud.com
04 34 39 04 29

Merci,
Les Fleurs de Nila
```

### **Email de Notification Marchand :**

```
Objet : 🛍️ Nouvelle commande #12345 - 57,00 €

Nouvelle commande reçue !

COMMANDE #12345
Montant : 57,00 € (payé)

CLIENT :
Nom : Marie Dupont
Email : marie.dupont@example.com
Tél : 06 12 34 56 78

PRODUITS :
- Bouquet Signature (45,00 €)
  Message personnalisé : "Joyeux anniversaire !"

LIVRAISON : (12,00 €)
3 rue de la République
30000 Nîmes

À préparer pour : sous 48h

Voir la commande complète :
[Lien vers dashboard Snipcart]
```

---

## 🔧 Configuration Avancée

### **A. Répondre aux Emails**

**Par défaut**, les emails viennent de :
```
orders@snipcart.com
```

**Pour personnaliser l'expéditeur** (Plan Business+) :
1. Settings → **Email Settings**
2. **Sender Email** : `noreply@fleursdenila.fr`
3. Nécessite une vérification de domaine

### **B. BCC (Copie Cachée)**

Pour recevoir une copie de TOUS les emails clients :
1. Settings → **Email Notifications**
2. **BCC Email** : `votre-email@example.com`

### **C. Webhooks (Avancé)**

Pour intégrer avec d'autres systèmes :
1. Settings → **Webhooks**
2. Configurez pour :
   - Ajouter commandes à Google Sheets
   - Notifier sur Slack
   - Envoyer à votre système de gestion

---

## ✅ Checklist de Configuration

### **Configuration de Base :**
- [ ] Email de confirmation client : ✅ Activé par défaut
- [ ] Facture PDF : ✅ Activée
- [ ] Notification marchand : ⚙️ Configurée avec votre email
- [ ] Logo ajouté : 🎨 Uploadé
- [ ] Couleurs personnalisées : 🎨 #1a365d

### **Personnalisation :**
- [ ] Message de bienvenue personnalisé
- [ ] Pied de page avec coordonnées
- [ ] Instructions de retrait/livraison
- [ ] Lien vers politique de retour

### **Tests :**
- [ ] Commande test en mode TEST
- [ ] Email reçu par le client
- [ ] Email reçu par le marchand
- [ ] Facture PDF présente
- [ ] Toutes les infos correctes

---

## 🎨 Template Email Personnalisé (Exemple)

Voici un exemple de template élégant pour vos emails :

### **Header :**
```html
┌──────────────────────────────────────┐
│  [LOGO FLEURS DE NILA]               │
│                                       │
│  Créations Florales Artisanales      │
│  Nîmes, France                        │
└──────────────────────────────────────┘
```

### **Body :**
```
Bonjour {customer_name},

Votre commande a bien été reçue ! 🌸

Nous allons préparer avec soin votre commande et vous 
tiendrons informé(e) à chaque étape.

[Détails de la commande]

MODE DE RETRAIT/LIVRAISON :
- Retrait boutique : Disponible sous 24h
  3 rue Auguste-Pellet, Nîmes
  Mardi-Samedi : 10h-19h

- Livraison : Sous 48h à votre adresse
```

### **Footer :**
```
─────────────────────────────────────

Questions ? Nous sommes là pour vous !
📧 fleursdenila@icloud.com
📞 04 34 39 04 29

Les Fleurs de Nila
3 rue Auguste-Pellet, 30000 Nîmes

[Instagram] [Facebook]
```

---

## 📞 Support

### **Si les emails ne fonctionnent pas :**

1. **Vérifiez les spams** du client
2. **Dashboard Snipcart** → Orders → Voir si "Email sent" ✅
3. **Settings → Email Notifications** → Vérifiez que tout est activé
4. **Mode Test** : Les emails sont envoyés mais marqués [TEST]

### **Contact Support Snipcart :**
- Email : support@snipcart.com
- Chat : Dans le dashboard (coin en bas à droite)
- Docs : https://docs.snipcart.com/v3/setup/emails

---

## 🚀 Résumé Action Immédiate

### **À Faire Maintenant (5 minutes) :**

1. **Dashboard Snipcart** → https://app.snipcart.com
2. **Settings → Notifications**
   - Ajoutez votre email : `fleursdenila@icloud.com`
   - ✅ Activez "New order notifications"
3. **Settings → Invoice**
   - ✅ Activez "Enable invoice"
   - Remplissez vos informations business
4. **Settings → Email Templates**
   - Uploadez votre logo
   - Choisissez couleur : `#1a365d`
5. **Testez** avec une commande en mode TEST

### **Plus Tard (Optionnel) :**
- Personnaliser les templates d'email
- Configurer email d'expédition
- Ajouter webhooks si nécessaire

---

**Les emails sont déjà configurés par défaut ! Vous n'avez qu'à ajouter votre email de notification et personnaliser le design. 🎉**

*Mise à jour : 12 octobre 2025*

