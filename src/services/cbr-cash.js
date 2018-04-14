const CbrCashApi = require('src/api/rbc-cash');

class CbrCashService {
  static async getBestOffer() {
    const data = await CbrCashApi.getCashRates();
    const best = {
      buy: 0,
      sell: 0
    };

    for (const bank of data.banks) {
      const buy = parseFloat(bank.rate.buy);
      const sell = parseFloat(bank.rate.sell);

      if (isFinite(buy) && (best.buy === 0 || best.buy > buy)) {
        best.buy = buy;
      }

      if (isFinite(sell) && sell > best.sell) {
        best.sell = sell;
      }
    }

    return best;
  }
}

module.exports = CbrCashService;