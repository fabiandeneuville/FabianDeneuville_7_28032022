# FORMATION DEVELOPPEUR WEB - OPEN CLASSROOMS - PROJET 7 #
# Création d'un réseau social d'entreprise #
![icon-left-font](https://user-images.githubusercontent.com/94392055/164500842-1c6d96bb-27e4-40d9-8a29-4da945ed2ee4.png)

## Contexte ##

Employé en tant que développeur au sein de l'agence web **CONNECT-E**, nous sommes sollicités pour développer un **réseau social interne** pour les employés de **Groupomania**, groupe spécialisé dans la grande distribution.
Le but de cet outil est de **faciliter les interactions entre collègues**.

***

## Contraintes ##

### Fonctionnalités ###

### Technologie ###

L'utilisation d'un **framework Frontend** est **obligatoire**. Nous avons opté pour le framework **Vue.js**.

Le client doit utiliser une **base de données relationnelle** qui se manipule avec le **langage SQL**. Nous avons opté pour une base de données **MySQL**, et un développement **sans ORM**.

### Sécurité ###

### Accessibilité ###

L'ensemble des pages doit respecter les **standards WCAG** pour l'accessibilité.

### Administration ###

***

## Installation ##

### Prérequis ###

Pour lancer le projet, vous devez avoir les programmes suivants installés sur votre machine :

- Node.js
- Vue.js
- MySQL

### Étape 1. Clonage du projet

Avec le terminal, depuis le dossier dans lequel vous souhaitez enregistrer le projet, clonez le projet avec la commande :

```
git clone https://github.com/fabiandeneuville/FabianDeneuville_7_28032022.git groupomania
```

Le dossier ainsi créé sur votre machine doit contenir les éléments suivants :

- Un dossier backend contenant le code de l'API
- Un dossier frontend contenant le code de l'application frontend
- Un fichier dbCreation.sql avec lequel vous allez créer la base de données sur votre machine
- Le fichier README.md que vous êtes en train de lire
- Le fichier image default_avatar.png

### Étape 2. Installation de l'application Frontend ###

### Étape 3. Installation de l'API ###

### Étape 4. Création de la base de données MySQL ###

Il est nécessaire d'avoir MySQL d'installé sur votre machine.

Exécutez MySQL avec votre Termial :

```
mysql -u root -p
```

Renseignez le mot de passe de l'utilisateur root.

Une fois connecté, importez le fichier dbCreation.sql avec la commande :

```
SOURCE path/dbCreation.sql;
``` 

Puis, vérifiez que la base de données Groupomania a bien été importée avec la commande :

```
SHOW DATABASES;
```

Enfin, indiquez à MySQL que vous souhaitez utiliser la base de données Groupomania avec la commande :

```
USE groupomania;
```

### Étape 5. Configuration des variables d'environnement et du fichier .gitignore ###

À la **racine** du dossier **backend**, ajoutez un fichier **.env** avec les éléments suivants :

```
dbUser = "identifiant de connexion à MySQl sur votre machine (utilisateur root)"
dbPassword = "mot de passe de connexion à MySQl sur votre machine (utilisateur root)"
dbHost = "127.0.0.1"
dbName = "groupomania"
EMAIL_ENCRYPTION_KEY = "chaîne de caractères aléatoire"
JWT_SECRET_TOKEN = "chaîne de caractères aléatoire"
```

À la **racine** du dossier **backend**, ajoutez un fichier **.gitignore** avec les éléments suivants :

```
/.env
/node_modules
/images
```

### Étape 6. Ajout du dossier images ###

À la **racine** du dossier **backend**, ajoutez le dossier images.
Placez-y le fichier **default_avatar.png**. 

### Étape 7. Lancement de l'API ###

Avec le terminal, depuis le dossier backend, éxécutez la commande :

```
nodemon server
```

Si tout se passe bien, les messages suivants apparaissent dans le terminal :

```
----------------------------------------
Listening on port 3000
----------------------------------------
Connected successfully to groupomania database
```

Vous êtes désormais prêt à utiliser l'application.

### Dernière étape, création du premier utilisateur ###

