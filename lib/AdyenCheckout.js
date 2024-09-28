const Adyen = require('./Adyen')

function AdyenCheckout (options = {}) {
  Adyen.call(this, options)

  this.apiVersion = options.apiVersion || 'v71'

  return this
}

AdyenCheckout.prototype = Object.create(Adyen.prototype)
AdyenCheckout.prototype.constructor = AdyenCheckout

AdyenCheckout.prototype._getURL = function _getURL (url) {
  url = url.replace(/^\//, '')
  return (this.environment === 'sandbox')
    ? `https://checkout-test.adyen.com/${this.apiVersion}/${url}`
    : `https://${this.apiPrefix}-checkout-live.adyenpayments.com/checkout/${this.apiVersion}/${url}`
}

module.exports = AdyenCheckout
