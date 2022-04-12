/******************** MULTER CONFIGURATION ********************/

/* Importing multer */
const multer = require('multer');

/* Creating a MIME_TYPES dictionary */
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/* Creating multer configuration's object */
const storage = multer.diskStorage({
    /* Defining images folder as destination */
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        /* Defining files name using the original name, where the spaces are replaced by _ */
        const name = file.originalname.split(' ').join('_');
        /* Generating extension by picking in the MIME_TYPE dictionary the mimetype that fit the mimetype of the file */
        const extension = MIME_TYPES[file.mimetype];
        /* Creating the file name using a date stamp to make it unique */
        callback(null, name + Date.now() + '.' + extension);
    }
});

/* Exporting the multer middleware */
module.exports = multer({storage}).single('image');