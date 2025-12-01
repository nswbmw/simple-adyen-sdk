class Adyen {
  constructor (options = {}) {
    this.apiKey = options.apiKey
    this.apiPrefix = options.apiPrefix
    this.environment = options.environment || 'sandbox'

    if (!this.apiKey) {
      throw new TypeError('No apiKey')
    }
    if ((this.environment !== 'sandbox') && !this.apiPrefix) {
      throw new TypeError('No apiPrefix')
    }
  }

  _getURL (url) {
    throw new Error('No implementation')
  }

  async execute ({ method = 'GET', url, headers = {}, body }) {
    const fetchOptions = {
      method,
      headers: Object.assign({
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      }, headers)
    }

    if (typeof body === 'string') {
      fetchOptions.body = body
    } else {
      fetchOptions.body = JSON.stringify(body)
    }

    const res = await fetch(this._getURL(url), fetchOptions)

    if (!res.ok) {
      throw new Error(await res.text())
    }

    return res.json()
  }
}

export default Adyen
