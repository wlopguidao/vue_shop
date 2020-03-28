import request from '@/utils/request'

const LoginApi = {
  //根据用户名和密码登录
  loginByUnameAndPew: function (userInfo) {
    return request({
      url: 'login',
      method: 'POST',
      data: userInfo
    })
  }
}

export default LoginApi

