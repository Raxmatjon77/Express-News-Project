const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + "/uploads/news-photos"));
  },
  filename: function (req, file, cb) {

  let filename = Date.now() + file.originalname;
  req.body.filename = filename;
  cb(null, filename);
  },
});
const upload = multer({ storage });
module.exports = upload;