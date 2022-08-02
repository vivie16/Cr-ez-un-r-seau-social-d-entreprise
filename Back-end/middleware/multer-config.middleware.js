const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === "posts") cb (null, "../Front-end/public/uploads/post")
        else if(file.fieldname === "profil") cb (null, "./Front-end/public/uploads/profil")
        else console.log("erreur dans la destination")
    },
    filename: (req, file, callback) => {
        const name = req.body.posterId;
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage });