import {
  OpenPageMode,
  PageOptionParam,
  PagePopupConfig,
  PageType,
  XterViewCustomizeOptions
} from 'interfaces/loginInfo'
import { Env, IUserInfo, LoginType, XterioAuth } from './index'
import './styles/main.scss'

const p = document.getElementById('userinfo')
const updateInfo = (info?: IUserInfo) => {
  if (p) {
    p.innerText = JSON.stringify(info)
  }
}

console.log('initial')
const redirect_uri = location.href
  .replace(/[?&]code=[^&]+/, '')
  .replace(/[?&]sso_login_method=[^&]+/, '')
  .replace(/[?&]sso_login_wallet=[^&]+/, '')
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

let currentPageName: PageType = PageType.asset
const addClick = (id: string, callback: any) => {
  const btn = document.getElementById(id)
  if (btn) {
    btn.onclick = () => {
      callback()
    }
  }
}
const hideDom = (cls: string, hide: boolean) => {
  const arr = document.getElementsByClassName(cls)
  for (let i = 0; i < arr.length; i++) {
    if (hide) {
      arr[i].classList.add('hide')
    } else {
      arr[i].classList.remove('hide')
    }
  }
}
const changePage = (page: PageType) => {
  currentPageName = page
  const el = document.getElementById('current-page')
  if (el) {
    el.innerText = currentPageName
  }

  //ui展示
  hideDom('config-asset', true)
  hideDom('config-setting', true)
  hideDom('config-nft-market', true)
  hideDom('config-nft-collection', true)
  if (currentPageName === PageType.asset) {
    hideDom('config-asset', false)
  } else if (currentPageName === PageType.setting) {
    hideDom('config-setting', false)
  } else if (currentPageName === PageType.nft_market) {
    hideDom('config-nft-market', false)
  } else if (currentPageName === PageType.nft_collection) {
    hideDom('config-nft-collection', false)
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
  console.log('id_token=', id_token)
  alert(id_token)
})
addClick('getOtac', async () => {
  const _otac = await XterioAuth.getOtac()
  console.log('_otac=', _otac)
  alert(_otac)
})
addClick('getLoginWay', () => {
  alert(XterioAuth.loginMethod)
})
addClick('getLoginWalletAddress', () => {
  alert(XterioAuth.loginWalletAddress)
})

addClick('openAsset', () => {
  XterioAuth.openPage(currentPageName, OpenPageMode.popup, { ...getPageParam(), popupConfig: getAlertConfig() })
})
addClick('openAsset-new', () => {
  XterioAuth.openPage(currentPageName, OpenPageMode.page, getPageParam())
})
addClick('openAsset-dom', async () => {
  const dom = await XterioAuth.openPage(currentPageName, OpenPageMode.iframeDom, getPageParam())
  console.log('dom=', dom)
  alert(dom)
})
addClick('openAsset-uri', async () => {
  const uri = await XterioAuth.openPage(currentPageName, OpenPageMode.iframeUri, getPageParam())
  console.log('uri=', uri)
  alert(uri)
})

addClick('page-asset', () => {
  changePage(PageType.asset)
})
addClick('page-setting', () => {
  changePage(PageType.setting)
})
addClick('page-nft-market', () => {
  changePage(PageType.nft_market)
})
addClick('page-nft-collection', () => {
  changePage(PageType.nft_collection)
})

changePage(PageType.asset)

const isChecked = (cls: string) => {
  const ele = document.getElementsByClassName(cls)?.[0]
  const input = ele.getElementsByTagName('input')?.[0]
  return input?.checked
}
const getRadioValue = (name: string) => {
  const tab: HTMLInputElement | null = document.querySelector(`input[name="${name}"]:checked`)
  return tab?.value
}
const getInputValue = (cls: string, tag: string = 'input') => {
  const ele = document.getElementsByClassName(cls)?.[0]
  const input = ele.getElementsByTagName(tag)?.[0] as HTMLInputElement
  return input?.value
}
const getPageParam = () => {
  let dic: Partial<PageOptionParam> = {}
  if (currentPageName === PageType.asset) {
    const value = (getRadioValue('asset_active_tab_option') || 'ingame') as PageOptionParam['active']
    dic = { ...dic, active: value }
  }
  if (currentPageName === PageType.setting) {
    const value = (getRadioValue('setting_active_tab_option') || 'account') as PageOptionParam['tab']
    dic = { ...dic, tab: value }
  }
  if (currentPageName === PageType.nft_collection) {
    dic = { ...dic, collection: '65e04d9b65fca97f09ff8f42' }
  }

  let options: XterViewCustomizeOptions = {}
  {
    if (isChecked('hide_wallet_entrance')) {
      options = { ...options, hide_wallet_entrance: true }
    }
    if (isChecked('hide_account_entrance')) {
      options = { ...options, hide_account_entrance: true }
    }
    if (isChecked('hide_menu_entrance')) {
      options = { ...options, hide_menu_entrance: true }
    }
    if (isChecked('hide_sign_out')) {
      options = { ...options, hide_sign_out: true }
    }
    if (isChecked('hide_header')) {
      options = { ...options, hide_header: true }
    }
    if (isChecked('hide_footer')) {
      options = { ...options, hide_footer: true }
    }
    if (isChecked('disable_logo_click')) {
      options = { ...options, disable_logo_click: true }
    }
    if (isChecked('hide_game_select') && currentPageName === PageType.asset) {
      options = { ...options, hide_game_select: true }
    }
    if (isChecked('hide_game_tokens') && currentPageName === PageType.asset) {
      options = { ...options, hide_game_tokens: true }
    }
    if (isChecked('hide_game_filter') && currentPageName === PageType.nft_market) {
      options = { ...options, hide_game_filter: true }
    }
    if (Object.keys(options).length) {
      dic['XterViewCustomOptions'] = options
    }
  }
  console.log('dic=', dic)
  return dic
}

const getAlertConfig = () => {
  const placement = (getRadioValue('alert_active_place_option') || 'right') as PagePopupConfig['placement']
  let dic: Partial<PagePopupConfig> = { placement }
  if (isChecked('alert_showCloseIcon')) {
    dic = { ...dic, showCloseIcon: false }
  }
  let _sty = { width: getInputValue('alert_width'), height: getInputValue('alert_height') }

  const _customsty = getInputValue('alert_style', 'textarea') || '{}'
  try {
    _sty = { ..._sty, ...JSON.parse(_customsty) }
  } catch (err) {
    console.error('自定义样式输入不合法', _customsty)
  }
  dic.style = _sty

  console.log('alertConfig=', dic)
  return dic
}
