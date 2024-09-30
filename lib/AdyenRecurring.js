const util = require('util')
const Adyen = require('./Adyen')

function AdyenRecurring (options = {}) {
  Adyen.call(this, options)

  this.apiVersion = options.apiVersion || 'v68'

  return this
}

AdyenRecurring.prototype._getURL = function _getURL (url) {
  url = url.replace(/^\//, '')
  return (this.environment === 'sandbox')
    ? `https://pal-test.adyen.com/pal/servlet/Recurring/${this.apiVersion}/${url}`
    : `https://${this.apiPrefix}-pal-live.adyenpayments.com/pal/servlet/Recurring/${this.apiVersion}/${url}`
}

util.inherits(AdyenRecurring, Adyen)

module.exports = AdyenRecurring
