/* eslint-disable prettier/prettier */
const express = require('express');
const { getGainLosses, saveNewGainLosses } = require('../../controllers/gainLosses.controller');

const router = express.Router();

router.post('/save-new', saveNewGainLosses);
router.get('/', getGainLosses);

module.exports = router;
