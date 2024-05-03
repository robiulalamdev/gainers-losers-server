const mongoose = require('mongoose');

const countrySchema = mongoose.Schema(
  {
    NO: {
      type: Number,
      required: false,
      // trim: true,
    },
    Ticker: {
      type: String,
      required: false,
      // trim: true,
    },
    Company: {
      type: String,
      required: false,
      // trim: true,
    },
    Sector: {
      type: String,
      required: false,
      // trim: true,
    },
    Industry: {
      type: String,
      required: false,
      // trim: true,
    },
    Country: {
      type: String,
      required: false,
      // trim: true,
    },
    'Market Cap': {
      type: String,
      required: false,
      // trim: true,
    },
    'P/E': {
      type: String,
      required: false,
      // trim: true,
    },
    Price: {
      type: String,
      required: false,
      // trim: true,
    },
    Change: {
      type: String,
      required: false,
      // trim: true,
    },
    Volume: {
      type: String,
      required: false,
      // trim: true,
    },
    dayOne: {
      type: String,
      required: false,
      // trim: true,
    },
    oneWeek: {
      type: String,
      required: false,
      // trim: true,
    },
    oneMonth: {
      type: String,
      required: false,
      // trim: true,
    },
    threeMonth: {
      type: String,
      required: false,
      // trim: true,
    },
    sixMonth: {
      type: String,
      required: false,
      // trim: true,
    },
    oneYear: {
      type: String,
      required: false,
      // trim: true,
    },
    gains: {
      type: String,
      required: false,
      // trim: true,
    },
    lossess: {
      type: String,
      required: false,
      // trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
