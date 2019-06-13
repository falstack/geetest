export default class {
  constructor(api) {
    return async params => {
      const { config, el, ready, async, success, error, close } =
        typeof params === 'object' ? params : {}
      if (!window.initGeetest) {
        error &&
          error({
            code: -1,
            status_code: -1,
            message: 'geetest初始化失败'
          })
        return
      }
      const product = config ? config.product || 'bind' : 'bind'
      const width = config ? config.width || '100%' : '100%'
      try {
        const result = await api()
        const initConfig = Object.assign({}, config, {
          gt: result.gt,
          challenge: result.challenge,
          offline: !result.success,
          product,
          width,
          new_captcha: 1
        })
        const callback = captcha => {
          captcha.onReady(() => ready && ready())
          if (product === 'bind') {
            async
              ? (el.onclick = () => captcha.verify())
              : captcha.onReady(() => captcha.verify())
          } else {
            captcha.appendTo(el)
          }
          captcha.onSuccess(() => {
            const result = captcha.getValidate()
            const data = Object.assign({}, result, {
              geetest_challenge: result.geetest_challenge,
              geetest_seccode: result.geetest_seccode,
              geetest_validate: result.geetest_validate
            })
            typeof params === 'object'
              ? success && success({ data, captcha })
              : params({ data, captcha })
          })
          captcha.onError(() => {
            close && close()
            error &&
              error({
                code: -2,
                status_code: -2,
                message: 'geetest实例化失败'
              })
          })
          captcha.onClose(() => close && close())
        }
        window.initGeetest(initConfig, callback)
      } catch (err) {
        close && close()
        error && error(err)
      }
    }
  }
}
