const axios = require('axios');
const API = require('../../settings/api.json');

class CountryController {
  static findCountry = async (request, response) => {
    const {countryName} = request.params;
    const capitalizedName = countryName?.replace(/(^\w|\s\w)/g, m => m?.toUpperCase());

    axios.get(API.countryNameApi + capitalizedName)
      .then(res => {
        const country = res?.data[0]?.name;

        response.status(200);
        response.json({country: country});
      })
      .catch(() => {
        response.status(200);
        response.json({country: null});
      })
  }

  static findMany = async (request, response) => {
    const {countryNames} = request.body;

    // I think the best solution here is just use /all endpoint and filter considering user's input
    axios.get(API.allCountriesApi)
      .then(res => {
        const normalizedNames = countryNames.map(c => c.toLowerCase())
        const countryList = res.data.map(c => c.name);
        const cList = countryList.filter(c => {
          const lowerName = c.toLowerCase();
          return normalizedNames.findIndex(n => lowerName.includes(n)) !== -1
        });

        response.status(200);
        response.json({countryList: cList});
      })
      .catch(() => {
        response.status(200);
        response.json({countryList: []});
      })
  }

  static findAll = async (request, response) => {
    axios.get(API.allCountriesApi)
      .then(res => {
        const countryList = res.data.map(c => c.name);

        response.status(200);
        response.json({countryList: countryList});
      })
      .catch(() => {
        response.status(200);
        response.json({countryList: []});
      })
  }
}

module.exports = {
  findCountry: CountryController.findCountry,
  findMany: CountryController.findMany,
  findAll: CountryController.findAll
};