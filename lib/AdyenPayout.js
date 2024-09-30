const util = require('util')
const Adyen = require('./Adyen')

function AdyenPayout (options = {}) {
  Adyen.call(this, options)

  this.apiVersion = options.apiVersion || 'v68'

  return this
}

AdyenPayout.prototype._getURL = function _getURL (url) {
  url = url.replace(/^\//, '')
  return (this.environment === 'sandbox')
    ? `https://pal-test.adyen.com/pal/servlet/Payout/${this.apiVersion}/${url}`
    : `https://${this.apiPrefix}-pal-live.adyenpayments.com/pal/servlet/Payout/${this.apiVersion}/${url}`
}

util.inherits(AdyenPayout, Adyen)

module.exports = AdyenPayout
