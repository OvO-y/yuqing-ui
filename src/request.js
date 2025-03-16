// 引入axios
import axios from 'axios'
// 创建axios实例
const request = axios.create({
  baseURL: 'http://localhost:8005/user',
  timeout: 5000
})
const service = axios.create({
  baseURL: 'http://localhost:8000',
  // 定义统一的请求头部
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  // 定义请求超时时间
  timeout: 10000
})
// 设置request请求拦截器
// 请求发送前对请求做一些处理(前端给后端发送数据【数据预处理，未到后端】)
// headers给后端传递token
request.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    // 设置请求头
    // const token = localStorage.getItem('token')

    // const user = localStorage.getItem('user')
    // if (token) {
    //   // config.headers["token"] = JSON.parse(user).token;
    //   config.headers['token'] = token
    // }
    // config.headers['token'] = user.token;
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 请求拦截器

service.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    // 如果有token或其他需要设置的请求头，可以在这里添加
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 设置response响应拦截器
// 后端返回数据后对数据做一些处理(后端给前端返回数据【数据后处理，数据到达后端了】)
// 判断状态码200为请求成功，非200为请求失败
request.interceptors.response.use(
  (response) => {
    let res = response.data
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    return res
  },
  (error) => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(new Error('网络请求错误'))
    }
    const res = response.data
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      // res = res ? JSON.parse(res) : res
      console.log('后端返回String：' + res)
    }
    return res
  },
  (error) => {
    console.log('err' + error)
    return Promise.reject(new Error(error.response))
  }
)

// 封装 POST 请求方法，区分不同的基础URL
export const postRequestForUser = (url, data) => {
  return request.post(url, data)
}

export const postRequestForService = (url, data) => {
  return service.post(url, data)
}

// 导出所有必要的实例和方法
export { request, service }
export default service
