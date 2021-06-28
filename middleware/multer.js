const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media", //it start from app.js
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
