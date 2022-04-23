# FORMATION DEVELOPPEUR WEB - OPEN CLASSROOMS - PROJET 7 #
# Création d'un réseau social d'entreprise #
![icon-left-font](https://user-images.githubusercontent.com/94392055/164500842-1c6d96bb-27e4-40d9-8a29-4da945ed2ee4.png)

## CONTEXTE ##

Employé en tant que développeur au sein de l'agence web **CONNECT-E**, nous sommes sollicités pour développer un **réseau social interne** pour les employés de **Groupomania**, groupe spécialisé dans la grande distribution.
Le but de cet outil est de **faciliter les interactions entre collègues**. 

Une enquête réalisée par un ***comité de pilotage sur le bien-être au travail** a en effet mis l'accent sur le fait qu'une partie du personnel n'était **pas satisfaite de l'ambiance de travail**.

***

## CONTRAINTES ##

### Exigences émises par le comité de pilotage ###

- la présentation des fonctionalités doit être simple
- la création d'un compte doit être simple et possible depuis un téléphone mobile
- le profil doit contenir très peu d'informations pour que sa complétion soit rapide
- la suppression du compte doit être possible
- l'accès à un forum où les salariés publient des contenus multimédias doit être présent
- l'accès à un forum où les salariés publient des textes doit être présent
- les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
- le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés

### Fonctionnalités ###

De manière à fournir dans un **délais raisonnable**, une **première version de l'application (MVP)**, il a été décidé de se concentrer dans un premier temps sur la fonctionnalité permettant à un utilisateur de **publier du contenu multimédia**, accompagné de texte. Une fonctionnalité connexe permet par ailleurs aux autres utilisateurs de **commenter et liker** les publications.

### Technologie ###

L'utilisation d'un **framework Frontend** est **obligatoire**. Nous avons opté pour le framework **Vue.js**.

Le client doit utiliser une **base de données relationnelle** qui se manipule avec le **langage SQL**. Nous avons opté pour une base de données **MySQL**, et un développement **sans ORM**.

### Sécurité ###

L'ensemble de l'**application**, ainsi que les **données des utilisateurs** doivent être **sécurisées** pour répondre aux standard de l'**OWASP** et de la **RGPD**.

### Accessibilité ###

L'ensemble des pages doit respecter les **standards WCAG** pour l'accessibilité.

### Administration ###

Il a été décidé de créer trois rôles distincts pour gérer les autorisations et assurer la modération de l'application :

- l'**admin** peut supprimer un utilisateur, attribuer ou retirer le rôle de modérateur, supprimer une publiation ou un commentaire
- le **modérateur** (rôle attribué par l'admin) peut supprimer une publication ou un commentaire
- le simple **utilisateur** peut supprimer son propre compte, supprimer ou modifier ses propres publications et commentaires 

### Évaluation du temps nécessaire au développement de l'application ###

15 jours/homme pour la partie backend 

-- jours/homme pour la partie frontend - DÉVELOPPEMENT EN COURS

***

## INSTALLATION ##

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

- un dossier backend contenant le code de l'API
- un dossier frontend contenant le code de l'application frontend
- un fichier dbCreation.sql avec lequel vous allez créer la base de données sur votre machine
- le fichier README.md que vous êtes en train de lire
- le fichier image default_avatar.png

### Étape 2. Installation de l'application Frontend ###

A VENIR !

### Étape 3. Installation de l'API ###

Depuis le dossier **backend**, à l'aide de votre terminal, installez les dépendances avec la commande :

```
npm install
```

Vous pouvez ensuite vérifier que les différents packages sont **à jour** avec la commande :

```
npm outdated
```

Enfin, vous pouvez vérifier les éventuelles **vulnérabilités** avec la commande :

```
npm audit
```

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

le ou la chargé-e de communication Groupomania peut dès à présent s'inscrire sur l'application. 

L'adresse prévue par défaut pour l'administrateur est **administrateur@groupomania.com**.
