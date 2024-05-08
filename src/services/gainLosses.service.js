/* eslint-disable prettier/prettier */
const { uplaodService } = require('.');
const GainLosses = require('../models/gainLosses.model');

const updateGainLosses = async () => {
  const gainersLosses = await uplaodService.getAllGainLoses();
  const isExist = await GainLosses.findOne();
  if (isExist) {
    const result = await GainLosses.updateOne(
      { _id: isExist._id },
      {
        $set: { total: gainersLosses.length, data: gainersLosses },
      },
      { new: false }
    );
    return result;
  }
  const newGainLosses = new GainLosses({ total: gainersLosses.length, data: gainersLosses });
  const result = await newGainLosses.save();
  return result;
};

module.exports = {
  updateGainLosses,
};
