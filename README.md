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

L'ensemble des pages soit respecter les **standards WCAG** pour l'accessibilité.

### Administration ###

***

## Installation ##

### Étape 1. Clonage du projet

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

### Étape 5. Configuration des variables d'environnement ###
