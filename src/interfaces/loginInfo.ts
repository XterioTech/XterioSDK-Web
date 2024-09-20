export interface ISSoTokensParams {
  app_id: string
  client_id: string
  client_secret: string
  redirect_uri: string
  response_type: string
  scope: string
  mode: 'default' | 'email'
  grant_type: string
  logout?: '0' | '1'
}
export interface IRes<T> {
  data: T
  err_code: number
}

export interface ITokenRes {
  id_token: string
  refresh_token: string
  access_token: string
}
export interface Payload {
  sub: string
  email_verified: boolean
  iss: string
  'cognito:username': string
  origin_jti: string
  aud: string
  event_id: string
  token_use: string
  auth_time: number
  exp: number // 单位: 秒
  iat: number
  jti: string
  email: string
}
export interface IUserInfoRes {
  about?: string
  avatar?: string
  create_at?: number
  email?: string
  username?: string
  uuid?: string
  source?: number // 0：email，1：facebook，2：google
  password?: number // 0: 未设置；1：已设置
}

export interface IWalletItem {
  address: string
  type: string
  created_at: string
  source: 0 | 1 | 2 // 0 配对钱包，1: pn钱包 2: aa钱包
}

export interface IUserInfo extends IUserInfoRes {
  wallet?: IWalletItem[]
}

export enum Env {
  Dev = 'Dev',
  Staging = 'Staging',
  Production = 'Production'
}

export enum Language {
  EN = 'en',
  ZH_HANS = 'zh_hans',
  ZH_HANT = 'zh_hant',
  JA = 'ja',
  KO = 'ko'
}

export enum LoginType {
  Default = 'default',
  Email = 'email',
  Mini = 'mini'
}

export interface ILoginServiceBody {
  'h-recaptcha-response'?: string
  username: string
  password: string
  subscribe?: 0 | 1
  invite_code?: string
}

interface ILoginServiceResSuccess {
  access_token: string
  id_token: string
  refresh_token: string
  error: false
  err_code?: string | number
}

export interface ILoginServiceResError extends Partial<Omit<ILoginServiceResSuccess, 'error'>> {
  error: true
  err_code: string | number
}

export type ILoginServiceRes = ILoginServiceResSuccess | ILoginServiceResError

export interface IRefreshServiceRes {
  id_token?: string
  access_token?: string
}
export interface IRefreshServiceBody {
  refresh_token: string
}

export interface IRegisterConfirmServiceBody extends Omit<ILoginServiceBody, 'h-recaptcha-response'> {
  code: string
}
export enum OpenPageMode {
  alert = 'alert', //open alert
  page = 'page', //open new page
  iframeDom = 'dom', //return iframe dom
  iframeUri = 'url' //return url
}
export enum PageType {
  asset = 'asset',
  nft = 'nft',
  account = 'account',
  wallet = 'wallet'
}
export interface PageOptionParam {
  active?: 'ingame' | 'onchain'
  keyword?: string
  collection?: string
  features?: { k: string; initValues: (number | string)[]; type?: string }[]
}
