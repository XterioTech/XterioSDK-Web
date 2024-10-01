import '@xterio-sdk/auth/style/main.css'
//方式1，先授权，再登录
import { XterioAuth, XterEventEmiter, Env, LoginType } from '@xterio-sdk/auth'

console.log('initial')
const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
const client_secret = 'ABC23'
const app_id = ''
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
XterioAuth.init({ client_id, client_secret, redirect_uri }, Env.Dev)
XterEventEmiter.subscribe((info) => {
  console.log('emit userinfo=', info)
  p.innerText = JSON.stringify(info)
})

const btn = document.getElementById('login')
const logoutBtn = document.getElementById('logout')
const emailBtn = document.getElementById('email')
const miniBtn = document.getElementById('login_mini')
const p = document.getElementById('userinfo')

if (miniBtn) {
  miniBtn.onclick = () => {
    // XterioAuth.
    XterioAuth.login(LoginType.Mini)
  }
}
if (btn) {
  btn.onclick = () => {
    XterioAuth.login()
  }
}
if (emailBtn) {
  emailBtn.onclick = () => {
    XterioAuth.login(LoginType.Email)
  }
}
if (logoutBtn) {
  logoutBtn.onclick = () => {
    XterioAuth.logout()
    p.innerText = ''
  }
}
