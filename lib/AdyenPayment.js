const Adyen = require('./Adyen')

function AdyenPayment (options = {}) {
  Adyen.call(this, options)

  this.apiVersion = options.apiVersion || 'v68'

  return this
}

AdyenPayment.prototype = Object.create(Adyen.prototype)
AdyenPayment.prototype.constructor = AdyenPayment

AdyenPayment.prototype._getURL = function _getURL (url) {
  url = url.replace(/^\//, '')
  return (this.environment === 'sandbox')
    ? `https://pal-test.adyen.com/pal/servlet/Payment/${this.apiVersion}/${url}`
    : `https://${this.apiPrefix}-pal-live.adyenpayments.com/pal/servlet/Payment/${this.apiVersion}/${url}`
}

module.exports = AdyenPayment
