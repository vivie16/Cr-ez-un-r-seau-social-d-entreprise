const multer = require('multer');
const upImg = `${__dirname}/../../Front-end/public/uploads`;

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// pour savoir ou stocker les images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, upImg);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('file');