const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_PATH = path.join(process.cwd(), '/uploads');

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    if (!fs.existsSync(UPLOAD_PATH)) {
      fs.mkdirSync(UPLOAD_PATH);
    }

    done(null, UPLOAD_PATH);
  },
  filename: (req, file, done) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extention = path.extname(file.originalname);

    done(null, `${file.fieldname}-${uniqueSuffix}${extention}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, done) => {
    console.log("file.mimetype", file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'|| file.mimetype === 'image/png') {
      done(null, true);
    } else {
      done(new Error('Incorrect file type'), false);
    }
  },
});

module.exports = upload;
