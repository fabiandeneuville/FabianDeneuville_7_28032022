/******************** USER CONTROLLER CONFIGURATION ********************/

/* Importing db connection configuration  */
const mysql = require('../dbConnection').connection;

/* Importing jsonwebtoken */
const jwt = require('jsonwebtoken');

/* Importing the Node File System package */
const fs = require('fs');

/* Importing environment variables */
require('dotenv').config();
const EMAIL_ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY;
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

/***** SECURITY *****/

/* Importing bcrypt */
const bcrypt = require('bcrypt');

/* Importing email-validator */
const emailValidator = require('email-validator');

/* Importing password-validator and creating schema */
const passwordValidator = require('password-validator');
const { json } = require('express');
const schema = new passwordValidator();
schema
.is().min(8)
.is().max(20)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.has().symbols()

/***** SIGNUP *****/
exports.signup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const imageUrl = 'http://localhost:3000/images/default_avatar.png';
    const bio = 'La bio n\'a pas encore été renseignée';
 
    if(!emailValidator.validate(email)){
        return res.status(401).json({message: `L'adresse email ${email} est NON valide !`});
    } else if (!schema.validate(password)){
        return res.status(401).json({message: "Le mot de passe NON valide. Utilisez des majuscules, minuscules, chiffres et symboles, aucun espace, pour 8(min) à 16(max) caractères"})
    } else if (passwordConfirm !== password){
        return res.status(401).json({message: "Les mots de passe ne sont pas identiques !"})
    }
    if(email === 'administrateur@groupomania.com'){
        role_id = 1;
    } else {
        role_id = 3;
    }
    bcrypt.hash(password, 10)
    .then(hash => {
        mysql.query(`INSERT INTO user (username, email, password, role_id, imageUrl, bio) VALUES (?,?,?,?,?,?)`, [username, email, hash, role_id, imageUrl, bio], (err, result, fields) => {
            if(err){
                return res.status(401).json({message: `L'adresse ${email} est déjà utilisée`});
            }
            res.status(200).json({message: 'Bienvenue !'})
        })
    })
};

/***** LOGIN *****/
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    mysql.query(`SELECT user.email, user.password, user.id, role.role FROM user JOIN role ON user.role_id = role.id WHERE email = '${email}'`, (err, result, fields) => {
        if(err){
            return res.status(500).json({err});
        }
        if(result.length === 0){
            return res.status(404).json({message: "utilisateur introuvable !"})
        }
        bcrypt.compare(password, result[0].password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({message: "mot de passe incorrect !"})
            }
            res.status(200).json({
                userId: result[0].id,
                role: result[0].role,
                token: jwt.sign(
                    {userId: result[0].id, role: result[0].role},
                    JWT_SECRET_TOKEN,
                    {expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({error}));
    });
};

/***** GET ALL USERS *****/
exports.getAllUsers = (req, res, next) => {
    mysql.query(`SELECT user.id, user.username, user.email, user.imageUrl, user.bio, role.role FROM user JOIN role on user.role_id = role.id`, (err, result, fields) => {
        if(err){
            return res.status(500).json({err});
        }
        if(result.length === 0){
            return res.status(404).json({message: "aucuns utilisateurs !"})
        }
        res.status(200).json(result);
    })
};

/***** GET ONE USER *****/
exports.getOneUser = (req, res, next) => {
    let userId = req.params.id;
    mysql.query(`SELECT user.id, user.username, user.email, user.imageUrl, user.bio, role.role FROM user JOIN role ON user.role_id = role.id WHERE user.id = ${userId}`, (err, result, fields) => {
        if(err){
            return res.status(404).json({err});
        }
        if(result.length === 0){
            return res.status(404).json({message: "utilisateur introuvable !"})
        }
        return res.status(200).json(result[0]);
    })
}

/***** DELETE ONE USER *****/
exports.deleteOneUser = (req, res, next) => {
    const id = req.params.id;
    const userId = req.auth.userId;
    const role = req.auth.role;
    const password = req.body.password;
    let hash;
    mysql.query(`SELECT * FROM user WHERE id = ${id}`, (err, result, fields) => {
        if(err){
            return res.status(500).json({err});
        }
        if(result.length === 0){
            return res.status(404).json({message: "utilisateur introuvable !"})
        }
        const filename = result[0].imageUrl.split('/images/')[1];

        if(role === "admin"){
            if (filename != "default_avatar.png"){
                fs.unlink(`images/${filename}`, () => {
                    mysql.query(`DELETE FROM user WHERE id = ${id}`, (err, result, fields) => {
                        return res.status(200).json({message: "utilisateur supprimé !"})
                    })
                })
            } else {
                mysql.query(`DELETE FROM user WHERE id = ${id}`, (err, result, fields) => {
                    return res.status(200).json({message: "utilisateur supprimé !"})
                })
            }
        } else if (role !== "admin" && id == userId) {
            hash = result[0].password;
            bcrypt.compare(password, hash)
            .then(valid => {
                if(!valid){
                    return res.status(403).json({message: "le mot de passe n'est pas valable !"})
                }
                if (filename != "default_avatar.png"){
                    fs.unlink(`images/${filename}`, () => {
                        mysql.query(`DELETE FROM user WHERE id = ${id}`, (err, result, fields) => {
                            return res.status(200).json({message: "utilisateur supprimé !"})
                        })
                    })
                } else {
                    mysql.query(`DELETE FROM user WHERE id = ${id}`, (err, result, fields) => {
                        return res.status(200).json({message: "utilisateur supprimé !"})
                    })
                }
            })
            .catch(error => res.status(403).json({error}));
        } else if (role !== "admin" && id !== userId){
            return res.status(403).json({message: "requête non autorisée !"})
        }
    })
};

/***** CHANGE ROLE *****/
exports.changeRole = (req, res, next) => {
    const id = req.params.id;
    const role = req.auth.role;
    mysql.query(`SELECT role.role FROM user JOIN role on user.role_id = role.id WHERE user.id = ${id}`, (err, result, fields) => {
        if(err){
            return res.status(500).json({err});
        }
        if(result.length === 0){
            return res.status(404).json({message: "utilisateur introuvable !"});
        }
        if (role === "admin" & result[0].role === "utilisateur"){
            mysql.query(`UPDATE user SET role_id = 2 WHERE id = ${id}`, (err, result, fields) => {
                if(err){
                    return res.status(500).json({err});
                }
                return res.status(201).json({message: "role de modérateur attribué à l'utilisateur !"});
            })
        } else if (role === "admin" & result[0].role === "modérateur"){
            mysql.query(`UPDATE user SET role_id = 3 WHERE id = ${id}`, (err, result, fields) => {
                if(err){
                    return res.status(500).json({err});
                }
                return res.status(201).json({message: "role de modérateur retiré à l'utilisateur !"});
            })
        }
        else {
            return res.status(403).json({message: "requête non autorisée !"});
        }
    })
};

/***** CHANGE PASSWORD *****/
exports.changePassword = (req, res, nex) => {
    const id = req.params.id;
    const role = req.auth.role;
    const userId = req.auth.userId;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    if(role === "admin" || id == userId){
        mysql.query(`SELECT * FROM user WHERE id = ${id}`, (err, result, fields) => {
            if(err){
                return res.status(500).json({err});
            }
            if(result.length === 0){
                return res.status(404).json({message: "utilisateur introuvable !"});
            }
            if(password != passwordConfirm){
                return res.status(403).json({message: "les mots ne passent ne sont pas identiques !"})
            }
            bcrypt.hash(password, 10)
            .then(hash => {
                mysql.query(`UPDATE user set password = '${hash}' WHERE id = ${id}`, (err, result, fields) => {
                    if(err){
                        return res.status(500).json({err});
                    }
                    return res.status(201).json({message: "mot de passe de l'utilisateur mis à jour !"})
                })
            })
        })
    } else {
        return res.status(403).json({message: "requête non autorisée !"})
    }
};

/***** MODIFY ONE USER *****/
exports.modifyUser = (req, res, next) => {
    const userId = req.params.id;
    const id = req.auth.userId;
    if(userId != id){
        return res.status(403).json({message: "requête non autorisée !"})
    }
    if(req.file){
        const user = JSON.parse(req.body.user);
        const newUsername = user.username;
        const newBio = user.bio;
        const newImageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        mysql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, result, fields) => {
            if(err){
                return res.status(404).json({err})
            }
            if(result.length === 0){
                return res.status(404).json({message: "utilisateur introuvable !"});
            }
            if(id != userId){
                return res.status(403).json({message: "requête non autorisée !"})
            }
            const filename = result[0].imageUrl.split('/images/')[1];
            if(filename != "default_avatar.png"){
                fs.unlink(`images/${filename}`, () => {
                    mysql.query(`UPDATE user SET username = '${newUsername}', bio = '${newBio}', imageUrl = '${newImageUrl}' WHERE id = ${userId}`, (err, result, fields) => {
                        if(err){
                            return res.status(500).json({err})
                        }
                        return res.status(201).json({message: "profil mis à jour !"})
                    })    
                })
            } else {
                mysql.query(`UPDATE user SET username = '${newUsername}', bio = '${newBio}', imageUrl = '${newImageUrl}' WHERE id = ${userId}`, (err, result, fields) => {
                    if(err){
                        return res.status(500).json({err})
                    }
                    return res.status(201).json({message: "profil mis à jour !"})
                }) 
            }
        })
    } else {
        const newUsername = req.body.username;
        const newBio = req.body.bio;
        mysql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, result, fields) => {
            if(err){
                return res.status(404).json({err})
            }
            if(result.length === 0){
                return res.status(404).json({message: "utilisateur introuvable !"});
            }
            if(id != userId){
                return res.status(403).json({message: "requête non autorisée !"})
            }
            mysql.query(`UPDATE user SET username = '${newUsername}', bio = '${newBio}' WHERE id = ${userId}`, (err, result, fields) => {
                if(err){
                    return res.status(500).json({err})
                }
                return res.status(201).json({message: "profil mis à jour !"})
            })
  
        })
    }
 };
