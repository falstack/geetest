### get start

```javascript
import Captcha from 'geetest-captcha'

const getGeetestConfigApi = () => new Promise(resolve => {
  resolve({
    gt,
    challenge,
    success,
    // others...
  })
})

Vue.prototype.$captcha = new Captcha(getGeetestConfigApi)

this.$captcha(({ data, captcha }) => {
    // do something on success
    // data = {
    //   geetest_challenge: result.geetest_challenge,
    //   geetest_seccode: result.geetest_seccode,
    //   geetest_validate: result.geetest_validate,
    //   others_get_geetest_api_result
    // }
    // captcha = geetest instance
})

this.$captcha({
    config: {
      // docs：https://docs.geetest.com/install/deploy/client/web#%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0
    },
    el: document.getElementById('xxx'), // not required, use at captcha.appendTo
    async: true, // not required, use at product = bind, click verify or api resolve verify
    ready: (() => {
        // do something
    }),
    success: ({ data, captcha }) => {
        // do something
    },
    error: (err => {
        // do something
        // err = {
        //   code: -1,        // -1：window.initGeetest is not defined, -2：geetest onError
        //   status_code: -1,
        //   message: 'xxx'
        // }
    }),
    close: (() => {
        // do something
    })
})
```
