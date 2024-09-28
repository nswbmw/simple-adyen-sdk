## simple-adyen-sdk

Simple Node.js SDK for Adyen.

### Usage

```js
const AdyenCheckout = require('simple-adyen-sdk').AdyenCheckout

const adyenCheckoutClient = new AdyenCheckout({
  apiKey: 'xxx',
  environment: 'sandbox',
  // proxy: 'http://127.0.0.1:5000@admin:123456'
})

;(async () => {
  const res = await adyenCheckoutClient.execute({
    method: 'post',
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
  console.log(res)
})().catch(console.error)
```
