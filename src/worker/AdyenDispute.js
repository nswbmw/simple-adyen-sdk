import Adyen from './Adyen.js'

class AdyenDispute extends Adyen {
  constructor (options = {}) {
    super(options)

    this.apiVersion = options.apiVersion || 'v30'
  }

  _getURL (url) {
    url = url.replace(/^\//, '')
    return (this.environment === 'sandbox')
      ? `https://ca-test.adyen.com/ca/services/DisputeService/${this.apiVersion}/${url}`
      : `https://${this.apiPrefix}-ca-live.adyenpayments.com/ca/services/DisputeService/${this.apiVersion}/${url}`
  }
}

export default AdyenDispute
