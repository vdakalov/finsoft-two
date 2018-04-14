const API = require('src/libs/api');
const https = require('https');

/**
 * Class provides work with data on rbc.ru
 */
class RbcCashApi extends API {

  static getBaseUrl() {
    return 'https://cash.rbc.ru/cash/json/';
  }

  static prepareResponse(raw) {
    return raw ? JSON.parse(raw) : new Error(`Response is empty`);
  }

  static hasError(data) {
  }

  /**
   * Get buy cash rates
   *
   * @see https://cash.rbc.ru/
   */
  static async getCashBuyRates() {
    return this.request('cash_rates/', {
      city: 1,
      currency: 3,
      deal: 'buy',
      amount: 100
    });
  }

  /**
   * Get sell cash rates
   *
   * @see https://cash.rbc.ru/
   */
  static async getCashSellRates() {
    return this.request('cash_rates/', {
      city: 1,
      currency: 3,
      deal: 'sell',
      amount: 100
    });
  }
}

module.exports = RbcCashApi;