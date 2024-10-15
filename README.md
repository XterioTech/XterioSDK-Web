# @xterio-sdk/auth

## 1. Install
`npm install @xterio-sdk/auth` | `yarn add @xterio-sdk/auth` | `pnpm add @xterio-sdk/auth` 

## 2. Usage

```ts
import '@xterio-sdk/auth/style/main.css'
import { XterioAuth, XterEventEmiter } from '@xterio-sdk/auth'

//1. Initialize only once
const redirect_uri = ''
const client_id = ''
const client_secret = ''
const app_id = ''
XterioAuth.init({app_id, client_id, client_secret, redirect_uri })

//2. Register to listen for user information
const unsubscribe = XterEventEmiter.subscribe(info=>{
  //subscribe
  console.log('info=', info)
})

unsubscribe() //unsubscribe

//or

XterEventEmiter.unsubscribe()//unsubscribe all account event

//3. SignIn
XterioAuth.login()
...
```

## 3. How to get userinfo
### `XterioAuth.userinfo` (`not recommend`)

### `XterioAuth.getUserInfo((info) => {})`
```ts
//example
XterioAuth.getUserInfo((info) => {
  //info:IUserInfo
})
```

### `XterEventEmiter.subscribe((info) => {})`
```ts
//example1
const unsubscribe = XterEventEmiter.subscribe((info: IUserInfo) => {
  updateInfo(info)
})

//example2
const unsubscribe = XterEventEmiter.subscribe<IUserInfo>((info) => {
  updateInfo(info)
})
```

## 4. API Reference

### 4.1 Method
#### `init(config, env?:Env)`
Initialize Function
```ts
XterioAuth.init({
  app_id:'',
  client_id:'',
  client_secret:'',
  redirect_uri:'',
  //sso login mode, the value of 'default'|'email'
  //the default value is 'default'
  mode:'default',
  //sso login whether logout when login, the value of '1'|'0'
  //the default value is '1'
  logout:'1',
  //the log level, close all console(>=5)，open all log(<=1)
  //the default value is 1
  logLevel: 1
}, Env.Dev)
```

#### `login(mode?: LoginType)`
login xterio
```ts
XterioAuth.login() //default: LoginType.Default
XterioAuth.login(LoginType.Email)
XterioAuth.login(LoginType.Mini)
```

#### `logout()`
quit xterio
```ts
XterioAuth.logout()
```

#### `getIdToken()`
check whether the idToken is valid. If the idToken is invalid, empty string is returned, else the non-empty str.
```ts
XterioAuth.getIdToken() //Promise<string>
```

#### `getUserInfo(p:Function)`
get userinfo with callback
```ts
//example
XterioAuth.getUserInfo((info) => {
  //info:IUserInfo
})
```

#### `openPage(page:PageType,mode?:OpenPageMode, options?:PageOptionParam)`
default mode: `OpenPageMode.alert`
```ts
//example1: page:asset, mode:alert
XterioAuth.openPage(PageType.asset, OpenPageMode.alert, {active: 'ingame'})

//example2: page:account, mode:page
XterioAuth.openPage(PageType.account, OpenPageMode.page)

//example3: page:wallet, mode:iframeDom
await XterioAuth.openPage(PageType.wallet, OpenPageMode.iframeDom) //return: domNode

//example4: page:nft, mode:iframeUri
await XterioAuth.openPage(PageType.nft, OpenPageMode.iframeUri, {
  keyword: '',
  collection: '',
  features: [{ k: '', initValues: [], type: '' }]
}) //return: uri
```

### 4.2 Property
#### `isLogin`
whether to log in
```ts
XterioAuth.isLogin //boolean
```

#### `userinfo`
get xterio user information
```ts
XterioAuth.userinfo
```

### 4.3 EventEmiter

#### `subscribe(callback:Func, _event?: string)`
```ts
//subscribe userinfo
const unsubscribe = XterEventEmiter.subscribe(()=>{}) //default: XTERIO_EVENTS.ACCOUNT

//unsubscribe userinfo(this userinfo event)
unsubscribe()

//unsubscribe userinfo(all userinfo event)
XterEventEmiter.unsubscribe() //default: XTERIO_EVENTS.ACCOUNT
```

#### `off/on(event:string, callback:Func)`
```ts
const cb = (info) => {
  console.log('emiter auth userinfo==', info)
}
XterEventEmiter.on(cb, 'event_name')
XterEventEmiter.off(cb, 'event_name')
```

#### `clear()`
clear all listeners

## 5. Interface/Type
### `Env`
```ts
export enum Env {
  Dev = 'Dev',
  Staging = 'Staging',
  Production = 'Production'
}
```

### `LoginType`
```ts
export enum LoginType {
  Default = 'default',
  Email = 'email',
  Mini = 'mini'
}
```

### `OpenPageMode`
```ts
export enum OpenPageMode {
  alert = 'alert', //open alert
  page = 'page', //open new page
  iframeDom = 'dom', //return iframe dom
  iframeUri = 'url' //return url
}
```

### `PageType`
```ts
export enum PageType {
  asset = 'asset',
  nft = 'nft',
  account = 'account',
  wallet = 'wallet'
}
```

###  `PageOptionParam`
```ts
export interface PageOptionParam {
  /** asset page */
  active?: 'ingame' | 'onchain'
  /** nft page */
  keyword?: string
  /** nft page */
  collection?: string
  /** nft page */
  features?: { k: string; initValues: (number | string)[]; type?: string }[]
  /** whether hide wallet entry */
  hide_wallet_entrance?: boolean
  /** whether hide account */
  hide_account_entrance?: boolean
  /** whether hide top nav menu */
  hide_menu_entrance?: boolean
  /** whether hide logout btn */
  hide_sign_out?: boolean
  /** whether hide footer */
  hide_footer?: boolean
  /** whether disable logo click event */
  disable_logo_click?: boolean
  /** whether hide game select, only asset page */
  hide_game_select?: boolean
  /** whether hide game tokens, only asset page */
  hide_game_tokens?: boolean
  /** whether hide game filter, only nft page */
  hide_game_filter?: boolean
  /** set alert configs */
  alertConfig?: {
    placement: 'left' | 'right' | 'center' //default: 'right'
    style: Partial<CSSStyleDeclaration> //default: { width: '400px', height: '100%' }
    showCloseIcon?: boolean
  }
}
```



