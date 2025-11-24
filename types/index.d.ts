export type Environment = 'sandbox' | 'production'

export type AdyenProxyOptions =
  | string
  | {
      protocol: 'http' | 'socks'
      host: string
      port: number
      username?: string
      password?: string
    }

export interface AdyenOptions {
  apiKey: string
  apiPrefix?: string
  environment?: Environment
  proxy?: AdyenProxyOptions
}

export interface AdyenServiceOptions extends AdyenOptions {
  apiVersion?: string
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD'

export interface ExecuteOptions {
  method?: HttpMethod
  url: string
  headers?: Record<string, string>
  body?: any
}

export class AdyenBinLookup {
  constructor (options: AdyenServiceOptions)
  execute (options: ExecuteOptions): Promise<any>
}

export class AdyenCheckout {
  constructor (options: AdyenServiceOptions)
  execute (options: ExecuteOptions): Promise<any>
}

export class AdyenDispute {
  constructor (options: AdyenServiceOptions)
  execute (options: ExecuteOptions): Promise<any>
}

export class AdyenPayment {
  constructor (options: AdyenServiceOptions)
  execute (options: ExecuteOptions): Promise<any>
}

export class AdyenPayout {
  constructor (options: AdyenServiceOptions)
  execute (options: ExecuteOptions): Promise<any>
}

export class AdyenRecurring {
  constructor (options: AdyenServiceOptions)
  execute (options: ExecuteOptions): Promise<any>
}
