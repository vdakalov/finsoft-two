const http = require('http');
const moment = require('moment');
const xmldom = require('xmldom');
const xpath = require('xpath.js');

moment.locale('ru');

/**
 * Class provides work with api on cbr.ru
 */
class CbrApi {
  /**
   * Request currency value of specified code
   * @see http://www.cbr.ru/scripts/XML_valFull.asp
   * @param {string} code Currency code (e.g. USD)
   * @return {Promise<Number>}
   */
  static async getTomorrowRate(code) {
    const date = moment().add(1, 'day').format('DD/MM/YYYY');

    return new Promise((resolve, reject) => {
      http.get(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=${date}`, response => {
        const content = [];

        response.on('data', chunk => content.push(chunk));
        response.on('end', () => {

          const raw = content.join('');

          const parser = new xmldom.DOMParser();
          const document = parser.parseFromString(raw);

          const nodes = xpath(document, `//Valute[CharCode="${code}"]/Value/text()`);

          if (nodes.length) {
            const node = nodes[0];
            const value = parseFloat(node.nodeValue.replace(/,/g, '.'));

            if (isFinite(value)) {
              resolve(value);
            } else {
              reject(new Error(`value for Valute with code "${code}" has bad format (${node.nodeValue})`));
            }
          } else {
            reject(null);
          }
        });
      });
    });
  }
}

module.exports = CbrApi;