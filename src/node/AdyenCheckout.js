import Adyen from './Adyen.js'

class AdyenCheckout extends Adyen {
  constructor (options = {}) {
    super(options)

    this.apiVersion = options.apiVersion || 'v71'
  }

  _getURL (url) {
    url = url.replace(/^\//, '')
    return (this.environment === 'sandbox')
      ? `https://checkout-test.adyen.com/${this.apiVersion}/${url}`
      : `https://${this.apiPrefix}-checkout-live.adyenpayments.com/checkout/${this.apiVersion}/${url}`
  }
}

export default AdyenCheckout
