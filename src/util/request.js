import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8081/api/admin',
  // baseURL: "http://localhost:8081/admin",

  timeout: 5000
})

// request拦截器
// 请求发送前对请求做一些处理
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

// response拦截器
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
export default request
