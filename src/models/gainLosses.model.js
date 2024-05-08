/* eslint-disable prettier/prettier */
const { Schema, model } = require('mongoose');

const gainLossesSchema = new Schema(
  {
    total: {
      type: Number,
      default: 0,
      required: false,
    },
    data: {
      type: [Object],
      required: false,
    },
  },
  { timeseries: true, timestamps: true }
);

const GainLosses = model('GainLosses', gainLossesSchema);
module.exports = GainLosses;
