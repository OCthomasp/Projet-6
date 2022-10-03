const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // Custom file name
    let sauceName = `${sauceObject.name}_by_${sauceObject.manufacturer}_`.split(' ').join('_');
    // We remove characters that are forbidden in a filename
    sauceName = sauceName.split(/[\\/:*?"<>|]/).join('');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, sauceName + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');