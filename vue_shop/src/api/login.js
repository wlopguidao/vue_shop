import request from '@/utils/request'

const LoginApi = {
  loginByUsername: function (loginForm) {
    return request({
      url: 'login',
      method: 'POST',
      data: loginForm
    })
  }
}

export default LoginApi

