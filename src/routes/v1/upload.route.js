const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const upload = require('../../middlewares/multer');

const router = express.Router();

router.post('/countryList', uploadController.countryList);
router.get('/gain-looses', uploadController.GainLoses);

router.post('/countryListExtractor', upload.single('country'), uploadController.countryList);

module.exports = router;
