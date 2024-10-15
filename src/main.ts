import { OpenPageMode, PageType } from 'interfaces/loginInfo'
import { Env, IUserInfo, LoginType, XterioAuth } from './index'
import './styles/main.scss'

const p = document.getElementById('userinfo')
const updateInfo = (info?: IUserInfo) => {
  if (p) {
    p.innerText = JSON.stringify(info)
  }
}

console.log('initial')
const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
const client_secret = 'ABC23'
const app_id = 'apiautotest'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
XterioAuth.init({ app_id, client_id, client_secret, redirect_uri }, Env.Dev)
//way1:
XterioAuth.getUserInfo((info) => {
  updateInfo(info)
})

//way2
// XterEventEmiter.subscribe((info: IUserInfo) => {
//   updateInfo(info)
// })

let currentPageName = PageType.asset
const addClick = (id: string, callback: any) => {
  const btn = document.getElementById(id)
  if (btn) {
    btn.onclick = () => {
      callback()
    }
  }
}
const changePage = () => {
  const el = document.getElementById('current-page')
  if (el) {
    el.innerText = currentPageName
  }
}
addClick('isLogin', () => {
  alert(XterioAuth.isLogin)
})
addClick('login', () => {
  XterioAuth.login()
})
addClick('logout', () => {
  console.log('/dddd')
  XterioAuth.logout()
  if (p) {
    p.innerText = ''
  }
})
addClick('login_email', () => {
  XterioAuth.login(LoginType.Email)
})
addClick('login_mini', () => {
  XterioAuth.login(LoginType.Mini)
})
addClick('getIdToken', async () => {
  const id_token = await XterioAuth.getIdToken()
  alert(id_token)
})
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
  const uri = await XterioAuth.openPage(currentPageName, OpenPageMode.iframeUri, {
    hide_account_entrance: true,
    hide_footer: true
  })
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
