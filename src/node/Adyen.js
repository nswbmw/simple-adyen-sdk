import request from 'lite-request'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { SocksProxyAgent } from 'socks-proxy-agent'

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

    const proxy = options.proxy
    if (proxy) {
      if (typeof proxy === 'string') {
        if (proxy.startsWith('http://')) {
          this.agent = new HttpsProxyAgent(proxy)
        } else if (proxy.startsWith('socks://')) {
          this.agent = new SocksProxyAgent(proxy)
        } else {
          throw new Error(`Invalid proxy string: "${proxy}". Expected "http://..." or "socks://..."`)
        }
      } else if (typeof proxy === 'object') {
        if (!['http', 'socks'].includes(proxy.protocol)) {
          throw new TypeError('proxy.protocol must be one of ["http", "socks"]')
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
  }

  _getURL (url) {
    throw new Error('No implementation')
  }

  async execute ({ method = 'GET', url, headers = {}, body }) {
    const payload = {
      method,
      url: this._getURL(url),
      headers: Object.assign({
        'X-API-Key': this.apiKey
      }, headers),
      agent: this.agent,
      json: true
    }

    if (body) {
      payload.body = body
    }

    const res = await request(payload)

    return res.data
  }
}

export default Adyen
