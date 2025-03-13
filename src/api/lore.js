import { service, postRequest } from '@/request.js'

// export function accounrtLogin( ) {
//   return service({
//     url: '/accountlogin'
//   })
// }
export function test01 (data) {
  return postRequest('/test01', data)
}

export const loginApi = (data) => {
  return postRequest('/api/login', data)
}
export const accountloginApi = (data) => {
  return postRequest('/accountlogin', data)
}
export const phoneloginApi = (data) => {
  return postRequest('/phonelogin', data)
}
export const registerApi = (data) => {
  return postRequest('/register', data)
}
export function get () {
  return service.get('/get')
}
