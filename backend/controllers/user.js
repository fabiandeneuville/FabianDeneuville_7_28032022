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
const schema = new passwordValidator();
schema
.is().min(8)
.is().max(20)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.has().symbols()

/* Creating a regex to check the validity of the req inputs to avoid injections */
const regexInputs = /^[a-zA-Z0-9 _.,!()&éêèàçùîï]+$/;

/***** SIGNUP *****/
exports.signup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    if(!emailValidator.validate(email)){
        return res.status(500).json({message: "adresse email NON valide !"});
    } else if (!schema.validate(password)){
        return res.status(500).json({message: "mot de passe NON valide. Utilisez des majuscules, minuscules, chiffres et symboles, aucun espace, pour 8(min) à 16(max) caractères"})
    } else if (passwordConfirm !== password){
        return res.status(500).json({message: "les mots de passe ne sont pas identiques !"})
    }
    if(email === 'administrateur@groupomania.com'){
        role_id = 1;
    } else {
        role_id = 3;
    }
    bcrypt.hash(password, 10)
    .then(hash => {
        mysql.query(`INSERT INTO user (username, email, password, role_id) VALUES (?,?,?,?)`, [username, email, hash, role_id], (err, result, fields) => {
            if(err){
                return res.status(500).json({err});
            }
            res.status(200).json({message: 'Bienvenue !'})
        })
    })
};

/***** LOGIN *****/
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    mysql.query(`SELECT * FROM user WHERE email = '${email}'`, (err, result, fields) => {
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
                role: result[0].role_id,
                token: jwt.sign(
                    {userId: result[0].id, role: result[0].role_id},
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
    mysql.query(`SELECT id, username, email, imageUrl, bio FROM user`, (err, result, fields) => {
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
    mysql.query(`SELECT id, username, email, imageUrl, bio FROM user WHERE id = ${userId}`, (err, result, fields) => {
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
        if(role === 1){
            mysql.query(`DELETE FROM user WHERE id = ${id}`, (err, result, fields) => {
                return res.status(200).json({message: "utilisateur supprimé !"})
            })
        } else if (role !== 1 && id == userId) {
            hash = result[0].password;
            bcrypt.compare(password, hash)
            .then(valid => {
                if(!valid){
                    return res.status(403).json({message: "le mot de passe n'est pas valable !"})
                }
                mysql.query(`DELETE FROM user WHERE id = ${id}`, (err, result, fields) => {
                    return res.status(200).json({message: "utilisateur supprimé !"})
                })
            })
            .catch(error => res.status(403).json({error}));
        } else if (role !== 1 && id !== userId){
            return res.status(403).json({message: "requête non autorisée !"})
        }
    })
};

/***** MODIFY ONE USER *****/
exports.modifyUser = (req, res, next) => {
    
};


/***** CHANGE ROLE *****/
exports.createModerator = (req, res, next) => {
    const id = req.params.id;
    const role = req.auth.role;
    const newRole = req.body.role;
    mysql.query(`SELECT * FROM user WHERE id = ${id}`, (err, result, fields) => {
        if(err){
            return res.status(500).json({err});
        }
        if(result.length === 0){
            return res.status(404).json({message: "utilisateur introuvable !"});
        }
        if (role === 1){
            mysql.query(`UPDATE user SET role_id = ${newRole} WHERE id = ${id}`, (err, result, fields) => {
                if(err){
                    return res.status(500).json({err});
                }
                return res.status(201).json({message: "utilisateur modifié !"});
            })
        }
        else {
            return res.status(403).json({message: "requête non autorisée !"});
        }
    })
};
