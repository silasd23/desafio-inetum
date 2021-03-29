const axios = require('axios').default;
const xsenv = require('@sap/xsenv');
const oauthEndpoint = "/oauth/token";
const FormData = require('form-data');
const cfenv = require('cfenv');

async function getJsonData(liveUrl,currencyAmount) {
        let convertCurrencyValue;
        let response;
        const requestionOptions = {
            method: 'GET',
            url: liveUrl,
            headers: {
                "content-type": "application/json"
            }
        }
        response = await axios(requestionOptions);
        return response = currencyAmount * response.data.quotes.USDEUR;
};

module.exports = {
    getJsonData
}