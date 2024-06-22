/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-continue */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const { Country } = require('../models');

const createCountryList = async (payload) => {
  // console.log('countryList:', payload);
  try {
    for (let countryData of payload) {
      // Check if a country with the same Ticker already exists
      const existingCountry = await Country.findOne({ Ticker: countryData.Ticker });
      if (existingCountry) {
        // console.log('Duplicate Ticker found. Skipping creation:', countryData.Ticker);
        continue; // Skip creation if duplicate Ticker is found
      }

      const countryList = await Country.create(countryData);
      console.log('Payload', countryData);
      if (!countryList) {
        throw new Error();
      }

      console.log('Executed successfully');
      continue;
    }
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Failed to create country list');
  }
};

const getAllGainLoses = async () => {
  try {
    const countriesData = await Country.find({});
    const modifiedStocks = [];
    const apiKey = 'PX3USK5O28KQACMI';

    for (const stock of countriesData) {
      const symbol = stock.Ticker;

      if (!!symbol) {
        const modifiedStock = {
          ...stock._doc,
          oneDay: null,
          oneWeek: null,
          oneMonth: null,
          threeMonth: null,
          sixMonth: null,
          oneYear: null,
        };

        const apiUrls = [
          {
            name: 'daily',
            api: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`,
          },
          {
            name: 'weekly',
            api: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`,
          },
          {
            name: 'monthly',
            api: `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`,
          },
        ];

        let todayClose = 0;
        for (const apiUrl of apiUrls) {
          const response = await axios.get(apiUrl.api);

          // --------Daily--------
          if (apiUrl.name === 'daily') {
            const dailyData = response.data['Time Series (Daily)'];

            const element1 = Object.entries(dailyData)[0];
            const element2 = Object.entries(dailyData)[1];

            todayClose = parseFloat(element1[1]['4. close']);
            const previousDayClose = parseFloat(element2[1]['4. close']);

            modifiedStock['oneDay'] = parseFloat((todayClose / previousDayClose) * 100 - 100);
          }

          // --------weekly--------
          else if (apiUrl.name === 'weekly') {
            const weeklyData = response.data['Weekly Time Series'];

            const element2 = Object.entries(weeklyData)[1];
            const previousDayClose = parseFloat(element2[1]['4. close']);
            modifiedStock['oneWeek'] = parseFloat((todayClose / previousDayClose) * 100 - 100);
          }

          // --------Monthly--------
          else {
            const monthlyData = response.data['Monthly Time Series'];

            const firstMonth = Object.entries(monthlyData)[1];
            const thirdMonth = Object.entries(monthlyData)[3];
            const sixMonth = Object.entries(monthlyData)[6];
            const year = Object.entries(monthlyData)[12];

            const previousDayClose = parseFloat(firstMonth[1]['4. close']);
            modifiedStock['oneMonth'] = parseFloat((todayClose / previousDayClose) * 100 - 100);

            // --------3 Months--------
            if (thirdMonth) {
              const thirdMonthClose = parseFloat(thirdMonth[1]['4. close']);
              modifiedStock['threeMonth'] = parseFloat((todayClose / thirdMonthClose) * 100 - 100);
            }

            // --------6 Months--------
            if (sixMonth) {
              const sixMonthClose = parseFloat(sixMonth[1]['4. close']);
              modifiedStock['sixMonth'] = parseFloat((todayClose / sixMonthClose) * 100 - 100);
            }

            // --------Year--------
            if (year) {
              const yearClose = parseFloat(year[1]['4. close']);
              modifiedStock['oneYear'] = parseFloat((todayClose / yearClose) * 100 - 100);
            }
          }
        }
        modifiedStocks.push(modifiedStock);
      }
    }
    return modifiedStocks;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Failed to get country list');
  }
};

const apiKey = 'PX3USK5O28KQACMI';
const baseURL = 'https://www.alphavantage.co/query';

const alphaVantageAPI = axios.create({
  baseURL,
  params: {
    apikey: apiKey,
  },
});

// const getAllGainLoses = async (req, res) => {
//   try {
//     const getAllGainLoses = await Country.find({}).lean(); // Use lean() to return plain JS objects

//     const modifiedStocks = await Promise.all(
//       getAllGainLoses.map(async (stock) => {
//         const symbol = stock.Ticker;
//         const apiURLs = [
//           `/query?function=OVERVIEW&symbol=${symbol}`,
//           `/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}`,
//           // Add more endpoints if needed
//         ];

//         const fetchedData = await Promise.all(
//           apiURLs.map(async (apiURL) => {
//             try {
//               const response = await alphaVantageAPI.get(apiURL);
//               return response.data;
//             } catch (error) {
//               console.error('Error fetching data:', error);
//               return null; // Or handle error as needed
//             }
//           })
//         );

//         const modifiedStock = {
//           ...stock,
//           fetchedData,
//           // Add more properties if needed
//         };
//         return modifiedStock;
//       })
//     );

//     res.json(modifiedStocks); // Return modified stocks as JSON response
//   } catch (error) {
//     console.error('Failed to get country list:', error);
//     res.status(500).json({ error: 'Failed to get country list' }); // Send appropriate error response
//   }
// };

module.exports = {
  createCountryList,
  getAllGainLoses,
};
