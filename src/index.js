const express = require('express');
const app = express();
const config = require(process.argv[2]);

const CbrApi = require('src/api/cbr');
const RbcCashService = require('src/services/cbr-cash');
const MoexService = require('src/services/moex');

app.get('/', async (request, response) => {
  let result = {};

  result.cbr_tomorrow_rate_usd = await CbrApi.getTomorrowRate('USD');
  result.rbc_cash = await RbcCashService.getBestOffer();
  result.moex = await MoexService.getLast();

  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(result, null, 2));
});

app.listen(config.port, config.host, () => {
  console.log(`Service listen http://${config.host}:${config.port}`);
});
