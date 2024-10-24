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
#### `init(config: Partial<ISSoTokensParams>, env?:Env)`
Initialize Function，View the detailed configuration of [ISSoTokensParams](#ISSoTokensParams)
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
login xterio, View the detailed configuration of [LoginType](#LoginType)
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

### `getOtac()`
```ts
XterioAuth.getOtac() //Promise<string>
```

#### `getUserInfo(p:Function)`
get userinfo with callback
```ts
//example
XterioAuth.getUserInfo((info) => {
  //info:IUserInfo
})
```

#### `openPage(page:PageType, mode?:OpenPageMode, options?:PageOptionParam)`
default mode: `OpenPageMode.alert`，View the detailed configuration of [PageOptionParam](#PageOptionParam) 、[PageType](#PageType)、[OpenPageMode](#OpenPageMode) [PageOptionParam](#`PageOptionParam`)

```ts
//example1: page:asset, mode:alert
XterioAuth.openPage(PageType.asset, OpenPageMode.alert, {
  active: 'ingame',
  alertConfig: {
    placement: 'center',
    showCloseIcon: false,
    style:{
      width: '200px',
      height: '200px',
      marginTop: "20px"
    }
  }
  //...
})

//example2: page:settings, mode:page
XterioAuth.openPage(PageType.setting, OpenPageMode.page, {
  tab: 'account',
  hide_wallet_entrance: true
  //...
})

//example3: page:marketplace, mode:iframeDom
await XterioAuth.openPage(PageType.nft_market, OpenPageMode.iframeDom, {
  //...
  keyword: '',
  collection: '',
  features: [{ k: '', initValues: [], type: '' }]
}) //return: domNode

//example4: page:collection, mode:iframeUri
await XterioAuth.openPage(PageType.nft_collection, OpenPageMode.iframeUri, {
  //...
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
### `ISSoTokensParams` <a id="ISSoTokensParams"></a>
```ts
export interface ISSoTokensParams {
  app_id: string
  client_id: string
  client_secret: string
  redirect_uri: string
  response_type: string //value: 'code'
  scope: string //value: 'all'
  mode: 'default' | 'email' //default: 'default'
  grant_type: string //value: 'authorization_code'
  logout?: '0' | '1' //default: '1'
  logLevel?: number //default: 1
}
```
### `Env` <a id="Env"></a>
```ts
export enum Env {
  Dev = 'Dev',
  Staging = 'Staging',
  Production = 'Production'
}
```

### `LoginType` <a id="LoginType"></a>
```ts
export enum LoginType {
  Default = 'default',
  Email = 'email',
  Mini = 'mini'
}
```

### `OpenPageMode` <a id="OpenPageMode"></a>
```ts
export enum OpenPageMode {
  alert = 'alert', //open alert
  page = 'page', //open new page
  iframeDom = 'dom', //return iframe dom
  iframeUri = 'url' //return url
}
```

### `PageType` <a id="PageType"></a>
```ts
export enum PageType {
  asset = 'asset',
  nft_market = 'nft_marketplace',
  nft_collection = 'nft_collection',
  setting = 'setting'
}
```

### `PageOptionParam` <a id="PageOptionParam"></a>
```ts
export type BooleanOrBinary = boolean | 1 | 0
export interface PageOptionParam {
  /** only settings page */
  tab?: 'profile' | 'account' | 'wallet' | 'security'
  /** only asset page */
  active?: 'ingame' | 'onchain'
  /** only nft market page */
  keyword?: string
  /** only nft page, required when nft_collection */
  collection?: string
  /** only nft page */
  features?: { k: string; initValues: (number | string)[]; type?: string }[]
  /** whether hide wallet entry */
  hide_wallet_entrance?: BooleanOrBinary
  /** whether hide account */
  hide_account_entrance?: BooleanOrBinary
  /** whether hide menu, only h5 usage */
  hide_menu_entrance?: BooleanOrBinary
  /** whether hide logout btn */
  hide_sign_out?: BooleanOrBinary
  /** whether hide header */
  hide_header?: BooleanOrBinary
  /** whether hide footer */
  hide_footer?: BooleanOrBinary
  /** whether disable logo click event */
  disable_logo_click?: BooleanOrBinary
  /** whether hide game select, only asset page */
  hide_game_select?: BooleanOrBinary
  /** whether hide game tokens, only asset page */
  hide_game_tokens?: BooleanOrBinary
  /** whether hide game filter, only nft page */
  hide_game_filter?: BooleanOrBinary
  /** set alert configs */
  alertConfig?: {
    placement: 'left' | 'right' | 'center'
    style: Partial<CSSStyleDeclaration>
    showCloseIcon?: boolean
  }
}
```



