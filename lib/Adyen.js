const request = require('request-promise')
const HttpsProxyAgent = require('https-proxy-agent')
const { SocksProxyAgent } = require('socks-proxy-agent')

function Adyen (options = {}) {
  this.apiKey = options.apiKey
  this.apiPrefix = options.apiPrefix
  this.environment = options.environment || 'sandbox'

  if (!this.apiKey) {
    throw new Error('No apiKey')
  }
  if ((this.environment !== 'sandbox') && !this.apiPrefix) {
    throw new Error('No apiPrefix')
  }

  const proxy = options.proxy
  if (proxy) {
    if (typeof proxy === 'string') {
      if (proxy.startsWith('http://')) {
        this.agent = new HttpsProxyAgent(proxy)
      } else if (proxy.startsWith('socks://')) {
        this.agent = new SocksProxyAgent(proxy)
      }
    } else if (typeof proxy === 'object') {
      if (!['http', 'socks'].includes(proxy.protocol)) {
        throw new Error('proxy.protocol must be one of ["http", "socks"]')
      }
      this.agent = (proxy.protocol === 'http')
        ? new HttpsProxyAgent((proxy.username && proxy.password)
          ? `http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
          : `http://${proxy.host}:${proxy.port}`
        )
        : new SocksProxyAgent((proxy.username && proxy.password)
          ? `socks://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
          : `socks://${proxy.host}:${proxy.port}`
        )
    }
  }

  return this
}

Adyen.prototype._getURL = function _getURL (url) {
  throw new Error('No implementation')
}

Adyen.prototype.execute = async function execute ({ method = 'get', url, headers = {}, body = {} }) {
  const payload = {
    method,
    url: this._getURL(url),
    json: true,
    headers: Object.assign({
      'X-API-Key': this.apiKey
    }, headers),
    agent: this.agent
  }

  if (!['get', 'delete'].includes(method.toLowerCase())) {
    payload.body = body
  }

  const res = await request(payload)

  return res
}

module.exports = Adyen
