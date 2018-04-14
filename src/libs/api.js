const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

class API {
  /**
   * Define API base url
   * @return {string}
   */
  static getBaseUrl() {
  }

  /**
   * Prepare raw response string
   * @param {string} raw
   * @return {Object|Array}
   */
  static prepareResponse(raw) {
    return raw;
  }

  /**
   * Detect errors in response
   * @param {Object|Array} data depends on `prepareResponse` method
   * @return {Error|undefined}
   */
  static hasError(data) {
  }

  /**
   * Define noCache param for request
   * @return {Object}
   */
  static noCacheParam() {
    return { _: new Date().getTime() };
  }

  static request(method, params, headers) {
    const baseUrl = this.getBaseUrl();
    const baseUrlObject = url.parse(`${baseUrl}${method}`);

    if (!params || typeof params !== 'object') {
      params = {};
    }

    params = Object.assign(params, this.noCacheParam());

    baseUrlObject.path += baseUrlObject.path.indexOf('?') !== -1 ? '&' : '?';
    baseUrlObject.path += querystring.stringify(params);

    if (headers && Object.keys(headers).length) {
      baseUrlObject.headers = headers;
    }

    switch (baseUrlObject.protocol) {
      case 'http:':
        return this._requestHttp(baseUrlObject);
      case 'https:':
        return this._requestHttps(baseUrlObject);
      default:
        throw new Error(`Undefined the protocol of the API baseUrl (${baseUrlObject.protocol})`);
    }
  }

  static async _requestHttp(options) {
    return new Promise((resolve, reject) => {
      http.get(options, response => this._collectHttpResponse(response, resolve, reject));
    });
  }

  static async _requestHttps(options) {
    return new Promise((resolve, reject) => {
      https.get(options, response => this._collectHttpResponse(response, resolve, reject));
    });
  }

  static _collectHttpResponse(response, resolve, reject) {
    const content = [];
    // response.setEncoding('utf8');
    response.on('data', chunk => content.push(chunk));
    response.on('end', () => {
      const raw = content.join('');
      const data = this.prepareResponse(raw);

      if (data instanceof Error) {
        return reject(data);
      }

      const error = this.hasError(data);

      if (error) {
        return reject(error);
      }

      resolve(data);
    });
  }
}

module.exports = API;