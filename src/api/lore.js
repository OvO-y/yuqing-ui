import { service, postRequestForService } from '@/request.js'

// export function accounrtLogin( ) {
//   return service({
//     url: '/accountlogin'
//   })
// }
export function test01 (data) {
  return postRequestForService('/test01', data)
}

export const loginApi = (data) => {
  return postRequestForService('/api/login', data)
}
export const accountloginApi = (data) => {
  return postRequestForService('/accountlogin', data)
}
export const phoneloginApi = (data) => {
  return postRequestForService('/phonelogin', data)
}
export const registerApi = (data) => {
  return postRequestForService('/register', data)
}
export function get () {
  return service.get('/get')
}
