import axios from 'axios'

// 创建一个axios实例
const service = axios.create({
  baseURL: "http://127.0.0.1:8888/api/private/v1/",
  timeout: 5000
})

// axios请求拦截,前端发起请求之前拦截
service.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
})

// axios响应拦截,后端返回响应后拦截
service.interceptors.response.use(config => {
  return config.data;
})

/**
 * get
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * post请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: 'POST',
      url: url,
      data: data
    }).then(response => {
      resolve(response);
    })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * patch请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
      });
  });
}

/**
 * put请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.put(url, data)
      .then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
      });
  });
}

export default service
