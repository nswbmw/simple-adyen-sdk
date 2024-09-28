const Adyen = require('./Adyen')

function AdyenBinLookup (options = {}) {
  Adyen.call(this, options)

  this.apiVersion = options.apiVersion || 'v54'

  return this
}

AdyenBinLookup.prototype = Object.create(Adyen.prototype)
AdyenBinLookup.prototype.constructor = AdyenBinLookup

AdyenBinLookup.prototype._getURL = function _getURL (url) {
  url = url.replace(/^\//, '')
  return (this.environment === 'sandbox')
    ? `https://pal-test.adyen.com/pal/servlet/BinLookup/${this.apiVersion}/${url}`
    : `https://${this.apiPrefix}-pal-live.adyenpayments.com/pal/servlet/BinLookup/${this.apiVersion}/${url}`
}

module.exports = AdyenBinLookup
