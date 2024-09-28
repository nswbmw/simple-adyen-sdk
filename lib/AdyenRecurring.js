const Adyen = require('./Adyen')

function AdyenRecurring (options = {}) {
  Adyen.call(this, options)

  this.apiVersion = options.apiVersion || 'v68'

  return this
}

AdyenRecurring.prototype = Object.create(Adyen.prototype)
AdyenRecurring.prototype.constructor = AdyenRecurring

AdyenRecurring.prototype._getURL = function _getURL (url) {
  url = url.replace(/^\//, '')
  return (this.environment === 'sandbox')
    ? `https://pal-test.adyen.com/pal/servlet/Recurring/${this.apiVersion}/${url}`
    : `https://${this.apiPrefix}-pal-live.adyenpayments.com/pal/servlet/Recurring/${this.apiVersion}/${url}`
}

module.exports = AdyenRecurring
