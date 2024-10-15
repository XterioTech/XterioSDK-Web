import '@xterio-sdk/auth/style/main.css'
//方式1，先授权，再登录
import { XterioAuth, XterEventEmiter, Env, LoginType, PageType, OpenPageMode } from '@xterio-sdk/auth'

console.log('initial')
const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
const client_secret = 'ABC23'
const app_id = 'apiautotest'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
XterioAuth.init({ client_id, client_secret, redirect_uri, app_id }, Env.Dev)
XterEventEmiter.subscribe((info) => {
  console.log('emit userinfo=', info)
  updateInfo(info)
})

const p = document.getElementById('userinfo')
const updateInfo = (info) => {
  if (p) {
    p.innerText = JSON.stringify(info)
  }
}
const addClick = (id, callback) => {
  const btn = document.getElementById(id)
  if (btn) {
    btn.onclick = () => {
      callback()
    }
  }
}
addClick('login', () => {
  XterioAuth.login()
})
addClick('login_email', () => {
  XterioAuth.login(LoginType.Email)
})
addClick('login_mini', () => {
  XterioAuth.login(LoginType.Mini)
})
addClick('logout', () => {
  XterioAuth.logout()
  updateInfo({})
})
addClick('isLogin', () => {
  alert(XterioAuth.isLogin)
})
addClick('getIdToken', async () => {
  const id_token = await XterioAuth.getIdToken()
  alert(id_token)
})

let currentPageName = PageType.asset
const changePage = () => {
  const el = document.getElementById('current-page')
  if (el) {
    el.innerText = currentPageName
  }
}
addClick('openAsset', () => {
  XterioAuth.openPage(currentPageName)
})
addClick('openAsset-new', () => {
  XterioAuth.openPage(currentPageName, OpenPageMode.page)
})
addClick('openAsset-dom', async () => {
  const dom = await XterioAuth.openPage(currentPageName, OpenPageMode.iframeDom)
  console.log('dom=', dom)
  alert(dom)
})
addClick('openAsset-uri', async () => {
  const uri = await XterioAuth.openPage(currentPageName, OpenPageMode.iframeUri)
  console.log('uri=', uri)
  alert(uri)
})
addClick('page-asset', () => {
  currentPageName = PageType.asset
  changePage()
})
addClick('page-account', () => {
  currentPageName = PageType.account
  changePage()
})
addClick('page-wallet', () => {
  currentPageName = PageType.wallet
  changePage()
})
addClick('page-nft', () => {
  currentPageName = PageType.nft
  changePage()
})
changePage()
