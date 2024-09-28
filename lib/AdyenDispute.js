const Adyen = require('./Adyen')

function AdyenDispute (options = {}) {
  Adyen.call(this, options)

  this.apiVersion = options.apiVersion || 'v30'

  return this
}

AdyenDispute.prototype = Object.create(Adyen.prototype)
AdyenDispute.prototype.constructor = AdyenDispute

AdyenDispute.prototype._getURL = function _getURL (url) {
  url = url.replace(/^\//, '')
  return (this.environment === 'sandbox')
    ? `https://ca-test.adyen.com/ca/services/DisputeService/${this.apiVersion}/${url}`
    : `https://${this.apiPrefix}-ca-live.adyenpayments.com/ca/services/DisputeService/${this.apiVersion}/${url}`
}

module.exports = AdyenDispute
