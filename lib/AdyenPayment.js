import Adyen from './Adyen.js'

class AdyenPayment extends Adyen {
  constructor (options = {}) {
    super(options)

    this.apiVersion = options.apiVersion || 'v68'
  }

  _getURL (url) {
    url = url.replace(/^\//, '')
    return (this.environment === 'sandbox')
      ? `https://pal-test.adyen.com/pal/servlet/Payment/${this.apiVersion}/${url}`
      : `https://${this.apiPrefix}-pal-live.adyenpayments.com/pal/servlet/Payment/${this.apiVersion}/${url}`
  }
}

export default AdyenPayment
