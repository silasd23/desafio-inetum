const convertCurrency = require('nodejs-currency-converter');
const axios = require('axios');
const { from } = require('form-data');
const connectivity = require('../utils/connectivity');

const getCurrency = async (req, res, next) => {
    const { fromCurrency, toCurrency, currencyAmount } = req.body;
    // console.log(requestData);
    let responseCurrencies;
    const convertEndpoint = 'convert';
    const liveEndpoint = 'live';
    const access_key = '8f32b6fc9f08b683519ee4843aba9089';
    const from = `&from=${fromCurrency}`;
    const to = `&to=${toCurrency}`;
    const amount = `&amount=${currencyAmount}`;
    const convertUrl = `http://api.currencylayer.com/` + convertEndpoint + `?access_key=` + access_key + `&format=1`+ from + to + amount;
    const liveUrl = `http://api.currencylayer.com/` + liveEndpoint + `?access_key=` + access_key + `&format=1`;
    // USD,EUR,GBP,AUD,NGN
    let result;
    try {
        result = await connectivity.getJsonData(liveUrl,currencyAmount);
        console.log(result);
        return res.sendStatus(result);
        
    } catch (error) {
        next(error)
    }
    
    
}

module.exports = {
    getCurrency
}