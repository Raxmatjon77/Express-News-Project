const multer = require("multer");
// const path = require("path");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new BadRequestError(400, "Only image files are allowed!"), false);
  }
};
const storage=(path) => multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path);
  },
  filename: function (req, file, cb) {

  let filename = Date.now() + file.originalname;
  req.body.filename = filename;
  cb(null, filename);
  },
});
const upload = (path) => multer({ storage: storage(path), fileFilter });
module.exports = upload;