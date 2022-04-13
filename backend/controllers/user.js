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

/* Importing crypto-js */
const cryptoJs = require('crypto-js')

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
    const cryptedEmail = cryptoJs.SHA256(email, EMAIL_ENCRYPTION_KEY).toString();
    bcrypt.hash(password, 10)
    .then(hash => {
        mysql.query(`INSERT INTO user (username, email, password, role_id) VALUES (?,?,?,?)`, [username, cryptedEmail, hash, 3], (err, result, fields) => {
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
    const cryptedEmail = cryptoJs.SHA256(email, EMAIL_ENCRYPTION_KEY).toString();
    mysql.query(`SELECT * FROM user JOIN role ON user.role_id = role.id WHERE email = '${cryptedEmail}'`, (err, result, fields) => {
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
                    {userId: result[0].id},
                    JWT_SECRET_TOKEN,
                    {expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({error}));
    });
};

/***** MODIFY USER *****/
exports.modifyUser = (req, res, next) => {
    
};

/***** GET ALL USERS *****/
exports.getAllUsers = (req, res, next) => {
    mysql.query(`SELECT username, bio, imageUrl, role FROM user JOIN role ON user.role_id = role.id`, (err, result, fields) => {
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
    mysql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, result, fields) => {
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
    let userId = req.params.id;
    mysql.query(`DELETE FROM user WHERE id = ${userId}`, (err, result, fields) => {
        if(err){
            return res.status(404).json({message: "utilisateur introuvable"});
        }
        return res.status(200).json({message: "utilisateur supprimé !"});
    })
};

