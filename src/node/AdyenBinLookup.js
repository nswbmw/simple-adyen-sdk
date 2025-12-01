import Adyen from './Adyen.js'

class AdyenBinLookup extends Adyen {
  constructor (options = {}) {
    super(options)

    this.apiVersion = options.apiVersion || 'v54'
  }

  _getURL (url) {
    url = url.replace(/^\//, '')
    return (this.environment === 'sandbox')
      ? `https://pal-test.adyen.com/pal/servlet/BinLookup/${this.apiVersion}/${url}`
      : `https://${this.apiPrefix}-pal-live.adyenpayments.com/pal/servlet/BinLookup/${this.apiVersion}/${url}`
  }
}

export default AdyenBinLookup
