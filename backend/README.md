# SPECIFICATIONS DE L'API #

## RÔLES ##
| ID | ROLE | PRÉROGATIVES |
|:---:|:---:|:---:|
| 1 | admin | Suppression d'un   utilisateur |
|  |  | Attribution ou retrait du rôle de modérateur  |
|  |  | Suppression d'un post |
|  |  | Suppression d'un commentaire |
| 2 | modérateur | Suppression d'un post |
|  |  | Suppression d'un commentaire |
| 3 | utilisateur | Suppression et   modification de ses propres posts et commentaires |

## ROUTES ##

### ROUTES USER ###
| VERBE | OBJECTIF | POINT D'ACCÈS | CORPS DE LA   REQUÊTE | REPONSE | FONCTIONNALITÉS |
|:---:|:---:|:---:|:---:|:---:|:---:|
| POST | Inscription   d'un utilisateur | /api/user/signup | {username:   string, email: string, password: string, passwordconfirm: string} | {message:   string} | Hachage   du mot de passe de l'utilisateur et ajout de l'utilisateur à la base de   données. Confirmation du mot de passe choisi par l'utilisateur. |
| POST | Connexion   d'un utilisateur | /api/user/login | {   email: string, password: string} | {userId:   number, role: string, token: string} | Vérification   des informations d'identification de l'utilisateur, renvoie l'id de   l'utilisateur, son role et un token signé qui contient également l'id et le   role. |
| DELETE | Suppression   d'un profil | /api/user/:id | - | {message:   string} | Supprime   l'utilisateur avec l'id fourni. L'admin peut supprimer un utilisateur. Un   utilisateur peut supprimer son profil. |
| PUT | Modification   d'un profil | /api/user/:id | {username:   string, bio: string} OU {user:   string, image: file} | {message:   string} | L'utilisateur   peut modifier sa bio et son username uniquement, ou également changer son   image de profil. |
| GET | Visualisation   d'un profil | /api/user/:id | - | user | Renvoie   l'utilisateur avec l'id fourni. |
| GET | Visualisation   des profils | /api/user/ | - | Tableau   d'users | Renvoie   un tableau contenant tous les utilisateurs de la base de données |
| PUT | Changement   du rôle | /api/user/:id/role | - | {message:   string} | Modifie   le role (id) de l'utilisateur avec l'id fourni. |
| PUT | Changement   du mot de passe | /api/user/:id/password | {password:   string, passwordconfirm: string} | {message:   string} | Modifie   le mot de passe de l'utilisateur. Le nouveau mot de passe est haché avant   d'être enregistré dans la base de données |


### ROUTES POST ###
| VERBE | OBJECTIF | POINT D'ACCÈS | CORPS DE LA   REQUÊTE | REPONSE | FONCTIONNALITÉS |
|:---:|:---:|:---:|:---:|:---:|:---:|
| GET | Visualisation   de tous les posts | /api/post/ | - | Tableau   de posts | Renvoie   un tableau contenant tous les posts présents dans la base de donnée, triés du   plus récent au plus ancien. |
| GET | Visualiser   de tous les posts d'un utilisteur | /api/post/user/:id | - | Tableau   de posts | Renvoie   les posts de l'utilisateur avec l'id fourni. |
| GET | Visualisation   d'un post | /api/post/:id | - | post | Renvoie   le post avec l'id fourni. |
| POST | Publication   d'un post | /api/post/ | {title:   string, content: string} OU   {post: string, image: file} | {message:   string} | L'utilisateur   peut créer un post avec ou sans image. |
| DELETE | Suppression   d'un post | /api/post/:id | - | {message:   string} | Un   utilisateur peut supprimer ses propres posts. Les utilisateurs authentifiés   comme admin ou modérateur peuvent supprimer tous les posts. |
| PUT | Modification   d'un post | /api/post/:id | {title:   string, content: string} OU   {post: string, image: file} | {message:   string} | L'utilisateur   peut modifier son propre post selon 4 scénarios. 1. Le post d'origine n'avait   pas d'image et l'utilisateur ajoute une image en modifiant son post. 2. le   post d'origine n'avait pas d'image et l'utilisateur n'en ajoute pas. 3. Le   post d'origine avait une image et l'utilisateur la modifie. 4. Le post   d'origine avait une image et l'utilisateur ne modifie que le contenu. |
| GET | Visualisation   des commentaires d'un post | /api/post/:id/comment | - | Tableau   de comments | Renvoie   les commenaire du post avec l'id fourni. |
| POST | Publication   d'un commentaire | /api/post/:id/comment | {content:   string} | {message:   string} | Ajoute   un commentaire au post avec l'id fourni. |
| GET | Visualisation   d'un commentaire | /api/post/:id/comment/:commentId | - | comment | Renvoie   le commentaire avec le commentid fourni correspondant au post avec l'id   fourni. |
| PUT | Modification   d'un commentaire | /api/post/:id/comment/:commentId | {content:   string} | {message:   string} | Modifie   le contenu du commentaire avec le commentid fourni, correspondant au post   avec l'id fourni. |
| DELETE | Suppression   d'un commentaire | /api/post/:id/comment/:commentId | - | {message:   string} | Un   utilisateur peut supprimer ses propres commentaires. Un utilisateur avec le   rôle d'admin ou de modérateur peut supprimer tous les commentaires. |
| POST | Like   d'un post (réversible) | /api/post/:id/like | - | {message:   string, count: number} | Vérifie   que l'utilisateur n'a pas déjà liké le post. Si NON, ajout d'une entrée (user_id + post_id) est ajouté dans la   table like,  comptage du nombre de like   correspondant au post_id et mise à jour du nombre de likes du post. Si OUI, suppression de la ligne   (user_id + post_id) de la table like,    comptage du nombre de like correspondant au post_id et mise à jour du   nombre de likes du post. |
| GET | Vérification si un utilisateur a déjà liké | /api/post/:id/like | - | {message:   string} | Vérifie   que l'utilisateur n'a pas déjà liké le post. Si NON, l'API retourne le message NO, Si OUI, l'API retourne le message YES |
| POST | Like   d'un commentaire (réversible) | /api/post/comment/:id/like | - | {message:   string} | Vérifie   que l'utilisateur n'a pas déjà liké le commentaire. Si   NON, ajout d'une entrée (user_id + comment_id) est   ajouté dans la table like,  comptage du   nombre de like correspondant au comment_id et mise à jour du nombre de likes   du commentaire. Si OUI,   suppression de la ligne (user_id + comment_id) de la table like,  comptage du nombre de like correspondant au   comment_id et mise à jour du nombre de likes du commentaire. |
| GET | Vérification si un utilisateur a déjà liké le commentaire| /api/comment/:id/like | - | {message:   string} | Vérifie   que l'utilisateur n'a pas déjà liké le post. Si NON, l'API retourne le message NO, Si OUI, l'API retourne le message YES |

## STRUCTURE DE LA BASE DE DONNÉES ##

### TABLE USER ###
| CHAMPS | TYPE | DESCRIPTION DU   CONTENU |
|:---:|:---:|---|
| id | Number | Id unique de   l'utilisateur |
| username | String | Nom d'utilisateur   unique |
| email | String | Adresse email unique |
| password | String | Mot de passe de   l'utilisateur |
| imageUrl | String | Avatar de   l'utilisateur |
| bio | String | Biographie de   l'utilisateur |
| role_id | Number | Id du rôle associé à   l'utilisateur |

### TABLE POST ###
| CHAMPS | TYPE | DESCRIPTION |
|---|:---:|---|
| id | Number | Id unique de la   publication |
| title | String | Titre de la   publication |
| content | String | Contenu de la   publication |
| imageUrl | String | Image de la   publication |
| likes | Number | Nombre de likes reçus   par la publication |
| date | Date | Date de publication |
| user_id | Number | Id de l'utilisateur   auteur de la publication |

### TABLE ROLE ###
| CHAMPS  | TYPE | DESCRIPTION |
|---|:---:|---|
| id | Number | Id unique du rôle |
| role | String | Rôle |

### TABLE COMMENT ###
| CHAMPS | TYPE | DESCRIPTION |
|---|:---:|---|
| id | Number | Id unique du   commentaire |
| content | String | Contenu du   commentaire |
| likes | Number | Nombre de likes reçus   par le commentaire |
| date | Date | Date de publication   du commentaire |
| post_id | Number | Id du post associé au   commentaire |
| user_id | Number | Id de l'utilisateur   auteur du commentaire |

### TABLE LIKE ###
| CHAMPS | TYPE | DESCRIPTION |
|---|:---:|---|
| id | Number | Id unique du like |
| post_id | Number | Id de la publication   likée |
| comment_id | Number | Id du commentaire   liké |
| user_id | Number | Id de l'utilisateur   auteur du like |
