# SPECIFICATIONS DE L'APPLICATION FRONTEND #

## TECHNOLOGIE ##

### Framework : ###

Le projet a été développé avec **Vue.js** (version 2)

### Pré-processeur CSS : ###

Le projet a été développé avec **SASS**

### Packages utilisés : ###

- Vue CLI
- Vuex
- Vue-router
- Axios

***

## FONCTIONNALITÉS ##

### 1.  Liste des fonctionnalités implémentées pour le MVP présenté ce jour : ###

### Utilisateurs ###

- **Inscription** de l'utilisateur avec un nom d'utilisateur (unique), une adresse email (unique), un mot de passe et la confirmation du mot du passe.

- **Connexion** de l'utilisateur.

- **Modification du profil** par l'utilisateur. Celui-ci peut modifier son nom utilisateur, ajouter une biographie et une photo de profil.

- L'utilisateur peut **modifier son mot de passe**.

- L'utilisateur peut **supprimer son profil**.

### Publications ###

- L'utilisateur peut **publier** une publication avec un titre et son contenu, avec ou sans image.

- L'utilisateur peut **supprimer ou modifier** ses propres publications.

### Interactions entre les utilisateurs ###

- L'utilisateur peut accéder à la **liste de tous les utilisateurs**.

- L'utilisateur, depuis la liste des utilisateurs, peut **accéder au profil** de chaque utilisateur, le **contacter** et voir ses **dernières publications**.

- L'utilisateur peut **liker les publications** des autres utilisateurs ainsi que ses propres publications.

- L'utilisateur peut **commenter les publications** des autres utilisateurs ainsi que ses propres publications.

- L'utilisateur peut **liker les commentaires** des autres utilisateurs ainsi que ses propres commentaires.

- L'utilisateur peut **supprimer ses propres commentaires**.

### Administration et modération ###

- L'admin peut **supprimer un utilisateur**.

- L'admin peut **supprimer une publication ou un commentaire**.

- L'admin peut **attribuer un rôle de modérateur** à un utilisateur ou lui **retirer**.

- Le modérateur peut **supprimer une publication ou un commentaire**.

### 2.  Liste des fonctionnalités déjà prévues pour une version ultérieure de l'application : ###

- Edition des commentaires.

- Moteur de recherche d'utilisateurs

- Amélioration de l'accessibilité (capture de focus)

***

## SÉCURITÉ ##

- Lors de la connexion, l'utilisateur est authentifié grâce à un token généré par l'API. Cette authentification permet d'assurer la navigation et le respect des différentes autorisations (publications, suppressions, modifications ....).

- Des Expressions régulières permettent de garantir la bonne saisie dans les champs lors de l'inscription.

- Les éventuelles erreurs sont retournées sous forme de message.

***

## ACCESSIBILITÉS ##

- L'application a été testée avec WAVE, qui ne retourne aucune erreur d'accessibilité.

- Un travail a été entamé pour permettre à un utilisateur de parcourir et d'interragir avec l'application sans utilisation de la souris. Ce travail va se poursuivre pour garantir une accessibilité optimale à l'avenir (capture du focus, info-bulles ...).

***

## VISUELS ##

<p align="center">Page d'inscription - Macbook Air 13 pouces</p>

![signup desktop](https://user-images.githubusercontent.com/94392055/170983990-8b4e240d-32ef-42cc-9c36-b5690dab5ad4.png)

<p align="center">Page d'inscription - Iphone 12</p>

<p align="center">
    <img src="https://user-images.githubusercontent.com/94392055/170984244-86c8e763-31b9-48af-b2dc-8224c9b7808c.png">
</p>

<p align="center">Fil principal - Macbook Air 13 pouces</p>

![desktop](https://user-images.githubusercontent.com/94392055/170984021-a271d078-1308-425e-8302-453e3dbbe1f6.png)


<p align="center">Fil principal - Iphone 12</p>
<p align="center">
    <img src="https://user-images.githubusercontent.com/94392055/170984257-48b381cc-44fc-449e-9476-8d129725dfe9.png">
</p>