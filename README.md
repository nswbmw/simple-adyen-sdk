## simple-adyen-sdk

Simple Adyen SDK for Node.js.

### Install

```sh
$ npm i simple-adyen-sdk --save
```

### Example

```js
import { AdyenCheckout } from 'simple-adyen-sdk'

const adyenCheckoutClient = new AdyenCheckout({
  apiKey: 'xxx',
  environment: 'sandbox',
  // proxy: 'http://127.0.0.1:5000@admin:123456'
})

;(async () => {
  const res = await adyenCheckoutClient.execute({
    method: 'POST',
    url: '/paymentLinks',
    body: {
      amount: {
        value: 999,
        currency: 'USD'
      },
      merchantAccount: 'YOUR_MERCHANT_ACCOUNT',
      reference: 'YOUR_ORDER_NUMBER',
      returnUrl: 'https://google.com/success'
    }
  })
  /*
  {
    amount: { currency: 'USD', value: 999 },
    expiresAt: '2025-11-25T03:16:06+01:00',
    merchantAccount: 'YOUR_MERCHANT_ACCOUNT',
    reference: 'YOUR_ORDER_NUMBER',
    returnUrl: 'https://google.com/success',
    reusable: false,
    storePaymentMethodMode: 'disabled',
    id: 'PL4379AD28135E7F32FDB526A',
    status: 'active',
    url: 'https://test.adyen.link/PL4379AD28135E7F32FDB526A'
  }
  */
  console.log(res)
})().catch(console.error)
```
