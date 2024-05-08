/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const GainLosses = require('../models/gainLosses.model');
const catchAsync = require('../utils/catchAsync');
const { updateGainLosses } = require('../services/gainLosses.service');

const getGainLosses = catchAsync(async (req, res) => {
  const result = await GainLosses.findOne();
  res.status(httpStatus.OK).send({ message: 'success', data: result });
});

const saveNewGainLosses = catchAsync(async (req, res) => {
  const result = await updateGainLosses();
  res.status(httpStatus.OK).send({ success: true, message: 'New Gain Losses Saved Successfully' });
});

module.exports = {
  getGainLosses,
  saveNewGainLosses,
};
