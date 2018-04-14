const MoexApi = require('micex.api');

class MoexService {
  static async getLast() {
    const data = await MoexApi.securityMarketdata('USD000UTSTOM');
    return data.node.last;
  }
}

module.exports = MoexService;