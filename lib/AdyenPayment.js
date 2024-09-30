const util = require('util')
const Adyen = require('./Adyen')

function AdyenPayment (options = {}) {
  Adyen.call(this, options)

  this.apiVersion = options.apiVersion || 'v68'

  return this
}

AdyenPayment.prototype._getURL = function _getURL (url) {
  url = url.replace(/^\//, '')
  return (this.environment === 'sandbox')
    ? `https://pal-test.adyen.com/pal/servlet/Payment/${this.apiVersion}/${url}`
    : `https://${this.apiPrefix}-pal-live.adyenpayments.com/pal/servlet/Payment/${this.apiVersion}/${url}`
}

util.inherits(AdyenPayment, Adyen)

module.exports = AdyenPayment
