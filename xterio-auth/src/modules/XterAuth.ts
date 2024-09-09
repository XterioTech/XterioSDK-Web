import type { ISSoTokensParams, Payload } from 'interfaces/loginInfo'
import { Env, LoginType } from 'interfaces/loginInfo'
import { XterioAuthInfo, XterioAuthTokensManager, XterioAuthUserInfoManager } from './XterAuthInfo'
import { XterEventEmiter } from './XterEventEmitter'
import { XterioAuthService } from './AuthService'
import { log, XTERIO_CONST, XTERIO_EVENTS } from 'utils'
import { XterAuthModal } from './XterAuthModal/XterAuthModal'
import qs from 'query-string'
import { XterioCache } from './XterCache'
import { decode } from 'js-base64'

const EnvBaseURLConst: Record<Env, string> = {
  [Env.Dev]: 'https://api.playvrs.net',
  [Env.Staging]: 'https://api.xterio.net',
  [Env.Production]: 'https://api.xterio.net'
}

export class XterioAuth {
  static get isLogin() {
    return !!XterioAuthUserInfoManager.userInfo?.uuid
  }
  static get userinfo() {
    return XterioAuthUserInfoManager.userInfo
  }
  private static get isVaildIdToken() {
    const id_token = XterioAuthTokensManager.idToken

    if (!id_token) {
      log('invalid token 1')
      return false
    }
    const payload = id_token.split('.')?.[1]
    if (!payload) {
      log('invalid token 2')
      return false
    }

    try {
      const { aud, exp = 0, sub } = JSON.parse(decode(payload)) as Payload
      const isExpire = !aud || Date.now() > exp * 1000
      return !isExpire
    } catch (error) {
      log('invalid token 3', error)
      return false
    }
  }

  private static async checkToken() {
    const _tokens = XterioCache.tokens
    if (_tokens) {
      XterioAuthTokensManager.setTokens(_tokens)
    }
    const id_token = XterioAuthTokensManager.idToken
    const refresh_token = XterioAuthTokensManager.refreshToken
    if (!id_token && refresh_token) {
      //req tokens by refresh
      const res = await XterioAuthService.refreshTokenService(refresh_token)
      XterioAuthTokensManager.setTokens({ refresh_token, id_token: res.id_token, access_token: res.access_token })
    }

    const isvalid = XterioAuth.isVaildIdToken
    log('check the tokens valid status:', isvalid)
    if (!isvalid) {
      this.clearData()
    } else {
      //get userinfo
      await XterioAuthService.getUserInfo()
    }
  }

  private static async checkCode() {
    const _type = XterioCache.loginType
    log('check the authorize status', _type)

    if (_type !== LoginType.Default && _type !== LoginType.Email) return

    const uri = XterioAuthInfo.config?.redirect_uri
    if (!uri || !location.href.startsWith(uri)) {
      log('not check, different redirect_uri')
      return
    }

    const queryParams = qs.parseUrl(location.href, { types: { code: 'string' } })
    const code = queryParams.query?.code
    if (!code) {
      throw new Error('no authorize')
    }
    if (uri) {
      history.pushState(null, '', uri)
    }
    log('going to login ...')
    const res = await XterioAuthService.login(code as string)
    if (res?.uuid) {
      XterioCache.delete(XTERIO_CONST.LOGIN_TYPE)
    }
  }

  static async init(config: Partial<ISSoTokensParams>, env?: Env) {
    const { client_id, client_secret, redirect_uri = '', mode } = config
    const _env = env ?? Env.Dev
    const _baseURL = EnvBaseURLConst[_env]
    const _config: ISSoTokensParams = {
      client_id: client_id || '',
      client_secret: client_secret || '',
      redirect_uri,
      response_type: 'code',
      scope: 'all',
      mode: mode || 'default',
      grant_type: 'authorization_code',
      logout: '1'
    }
    XterioAuthInfo.client_id = client_id || ''
    XterioAuthInfo.env = _env
    XterioAuthInfo.baseURL = _baseURL
    XterioAuthInfo.authorizeUrl = _baseURL + `/account/v1/oauth2/authorize?` + qs.stringify(_config)
    XterioAuthInfo.config = _config

    XterEventEmiter.clear()

    // init XterAuthLoginModal
    // must init before async function
    XterAuthModal.init(_baseURL)
    log(XterAuthModal.instance)

    await this.checkToken()
    window.addEventListener('load', async (event: Event) => {
      await this.checkCode()
    })
  }
  private static clearData() {
    XterioCache.delete(XTERIO_CONST.LOGIN_TYPE)
    XterioCache.deleteTokens()
    XterioCache.deleteUserInfo()
    XterioAuthTokensManager.removeTokens()
    XterioAuthUserInfoManager.removeUserInfo()
  }
  static logout() {
    log('logout success')
    this.clearData()
    XterAuthModal?.instance?.store?.logout()
  }
  static async login(mode?: LoginType) {
    if (!XterioAuthInfo.config) {
      log('xterio auth sdk initial failed')
      return
    }
    if (mode && mode !== LoginType.Mini) {
      XterioAuthInfo.config = { ...XterioAuthInfo.config, mode }
      XterioAuthInfo.authorizeUrl =
        XterioAuthInfo.baseURL + `/account/v1/oauth2/authorize?` + qs.stringify(XterioAuthInfo.config)
    }

    if (XterioAuth.isLogin) {
      //logined, callback the account info
      log('already logined.')
      XterEventEmiter.emit(XTERIO_EVENTS.ACCOUNT, XterioAuthUserInfoManager.userInfo)
      return
    }
    if (XterioAuth.isVaildIdToken) {
      //idtoken not expired
      log('get userinfo')
      return XterioAuthService.getUserInfo()
    }

    if (mode === LoginType.Mini) {
      XterAuthModal.instance.open()
      return
    }

    XterioCache.loginType = mode || LoginType.Default

    //go to authorize
    log('going to authorize ...')
    location.href = XterioAuthInfo.authorizeUrl
  }
}
