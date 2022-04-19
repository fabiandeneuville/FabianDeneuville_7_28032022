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

/***** GET ALL POSTS *****/
exports.getAllPosts = (req, res, next) => {
    mysql.query(`SELECT post.id, user.username, post.user_Id, post.title, post.content, post.imageUrl, DATE_FORMAT(date, 'à %Hh%i le %d/%c/%Y') as date, post.likes FROM post JOIN user ON user.id = post.user_Id ORDER BY date DESC`, (err, result, fields) => {
        if(err){
            res.status(500).json({err});
        }
        if(result.length === 0){
            return res.status(404).json({message: "aucun posts !"})
        }
        return res.status(200).json(result);
    })
};

/***** GET ALL POSTS FROM ONE USER *****/
exports.getAllPostsFromOneUser = (req, res, next) => {
    const id = req.params.id;
    mysql.query(`SELECT post.id, user.username, post.title, post.content, post.imageUrl, DATE_FORMAT(date, 'à %Hh%i le %d/%c/%Y') as date, post.likes FROM post JOIN user on user.id = post.user_id WHERE user.id = ${id} ORDER BY date DESC`, (err, result, fields) => {
        if(err){
            res.status(500).json({err});
        }
        if(result.length === 0){
            return res.status(404).json({message: "aucun posts !"})
        }
        return res.status(200).json(result);
    })
};

/***** DELETE ONE POST *****/
exports.deleteOnePost = (req, res, next) => {
    const id = req.params.id;
    const userId = req.auth.userId;
    const role = req.auth.role;
    mysql.query(`SELECT * FROM post WHERE id = ${id}`, (err, result, fields) => {
        if(err){
            return res.status(500).json({err});
        }
        if(result.length === 0){
            return res.status(404).json({message: "post introuvable !"});
        }
        if(result[0].user_id != userId && role == "utilisateur"){
            return res.status(403).json({message: "requête non autorisée !"});
        }
        if(result[0].imageUrl != null){
            const filename = result[0].imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                mysql.query(`DELETE FROM post WHERE id = ${id}`, (err, result, fields) => {
                    if(err){
                        return res.status(500).json({err});
                    }
                    return res.status(200).json({message: "post supprimé !"});
                })
            })
        } else {
            mysql.query(`DELETE FROM post WHERE id = ${id}`, (err, result, fields) => {
                if(err){
                    return res.status(500).json({err});
                }
                return res.status(200).json({message: "post supprimé !"});
            })
        }
    })
};