/******************** POST CONTROLLER CONFIGURATION ********************/

/* Importing db connection configuration  */
const mysql = require('../dbConnection').connection;

/* Importing the Node File System package */
const fs = require('fs');

/***** CREATE POST *****/
exports.createPost = (req, res, next) => {
    const userId = req.auth.userId;
    if(req.file){
        const post = JSON.parse(req.body.post);
        const title = post.title;
        const content = post.content;
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        mysql.query(`INSERT INTO post (title, content, imageUrl, date, user_Id) VALUES (?, ?, ?, NOW(), ?)`, [title, content, imageUrl, userId], (err, result, fields) => {
            if(err){
                return res.status(500).json({err});
            }
            return res.status(201).json({message: "post publié !"})
        })
    } else {
        const title = req.body.title;
        const content = req.body.content;
        mysql.query(`INSERT INTO post (title, content, date, user_Id) VALUES (?, ?, NOW(), ?)`, [title, content, userId], (err, result, fields) => {
            if(err){
                return res.status(500).json({err});
            }
            return res.status(201).json({message: "post publié !"})
        });
    }
};