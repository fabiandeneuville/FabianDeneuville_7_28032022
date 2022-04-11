/******************** USER CONTROLLER CONFIGURATION ********************/

/* Importing db connection configuration  */
const mysql = require('../dbConnection').connection;

/* SIGNUP */
exports.signup = (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    mysql.query(`INSERT INTO user (username, email, password) VALUES (?,?,?)`, [userName, email, password], (err, result, fields) => {
        if(err){
            return res.status(500).json({err});
        }
        res.status(200).json({message: 'utilisateur créé !'})
    })
};

/* LOGIN */