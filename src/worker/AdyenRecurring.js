import Adyen from './Adyen.js'

class AdyenRecurring extends Adyen {
  constructor (options = {}) {
    super(options)

    this.apiVersion = options.apiVersion || 'v68'
  }

  _getURL (url) {
    url = url.replace(/^\//, '')
    return (this.environment === 'sandbox')
      ? `https://pal-test.adyen.com/pal/servlet/Recurring/${this.apiVersion}/${url}`
      : `https://${this.apiPrefix}-pal-live.adyenpayments.com/pal/servlet/Recurring/${this.apiVersion}/${url}`
  }
}

export default AdyenRecurring
