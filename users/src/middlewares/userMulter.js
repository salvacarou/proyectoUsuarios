const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: function (req, file, cb) {
        const name = file.fieldname + "-" + path.extname(file.originalname)
        cb(null, name)
    }
});

const upload = multer({ storage });

module.exports = upload;