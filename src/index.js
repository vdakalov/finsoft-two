const express = require('express');
const app = express();
const config = require(process.argv[2]);

const CBR = require('src/libs/cbr');

app.get('/', async (request, response) => {
  let result = {};

  result.cbr_tomorrow_rate_usd = await CBR.getTomorrowRate('USD');


  response.end(JSON.stringify(result, null, 2));
});

app.listen(config.port, config.host, () => {
  console.log(`Service listen http://${config.host}:${config.port}`);
});










