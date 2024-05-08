const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { uplaodService } = require('../services');
const GainLosses = require('../models/gainLosses.model');
const { updateGainLosses } = require('../services/gainLosses.service');

const countryList = catchAsync(async (req, res) => {
  const countryList = await uplaodService.createCountryList(req.body);
  const result = await updateGainLosses();
  res.status(httpStatus.CREATED).send({ countryList });
});

const GainLoses = catchAsync(async (req, res) => {
  const modifiedStocks = await uplaodService.getAllGainLoses();
  res.status(httpStatus.CREATED).send({ getAllGainLoses: modifiedStocks?.length, Data: modifiedStocks });
});

module.exports = {
  countryList,
  GainLoses,
};
