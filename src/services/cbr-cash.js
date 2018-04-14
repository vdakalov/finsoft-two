const CbrCashApi = require('src/api/rbc-cash');

class CbrCashService {
  static async getBestOffer() {
    const buyData = await CbrCashApi.getCashBuyRates();
    const sellData = await CbrCashApi.getCashSellRates();

    const rates = {
      buy: 0,
      sell: 0
    };

    for (const bank of buyData.banks) {
      const rate = parseFloat(bank.rate.actual_rate);

      if (isFinite(rate) && (rates.buy === 0 || rates.buy > rate)) {
        rates.buy = rate;
      }
    }

    for (const bank of sellData.banks) {
      const rate = parseFloat(bank.rate.actual_rate);

      if (isFinite(rate) && rate > rates.sell) {
        rates.sell = rate;
      }
    }

    return rates;
  }
}

module.exports = CbrCashService;