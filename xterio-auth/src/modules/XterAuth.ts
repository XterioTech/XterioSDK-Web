import type { ISSoTokensParams, IUserInfo, Payload } from 'interfaces/loginInfo'
import { Env, LoginType } from 'interfaces/loginInfo'
import { XterioAuthInfo, XterioAuthTokensManager, XterioAuthUserInfoManager } from './XterAuthInfo'
import { XterEventEmiter } from './XterEventEmitter'
import { XterioAuthService } from './AuthService'
import { EnvVariableConfig, setLogLevel, XLog, XTERIO_CONST, XTERIO_EVENTS } from 'utils'
import { XterAuthModal } from './XterAuthModal/XterAuthModal'
import qs from 'query-string'
import { XterioCache } from './XterCache'
import { decode } from 'js-base64'
import { getOtac, openPage } from './XterPage'
import { LoadingState, XTimeOut } from 'utils/timer'

export class XterioAuth {
  static get userinfo() {
    return XterioAuthUserInfoManager.userInfo
  }
  private static setTokenTimer(duration: number) {
    // const duration = 10000
    if (duration < 0) return
    XTimeOut.getInstance().addTimeout(() => {
      //idToken expired logic
      this.setIsLogin(false)
      XterioAuthTokensManager.removeIdToken()
      XLog.info('the token timer, refresh token auto')
      this.checkToken('tokenTimer')
    }, duration)
  }
  private static get isVaildIdToken() {
    const id_token = XterioAuthTokensManager.idToken

    if (!id_token) {
      XLog.error('invalid token: idtoken null')
      return false
    }
    const payload = id_token.split('.')?.[1]
    if (!payload) {
      XLog.error('invalid token: idtoken error')
      return false
    }

    try {
      const { aud, exp = 0, sub } = JSON.parse(decode(payload)) as Payload
      this.setTokenTimer((exp - 60) * 1000 - Date.now())
      const isExpire = !aud || Date.now() > (exp - 60) * 1000
      return !isExpire
    } catch (error) {
      XLog.error('invalid token: idtoken error')
      return false
    }
  }

  private static _islogin: boolean
  static get isLogin() {
    return this._islogin
  }
  static setIsLogin(f: boolean) {
    XLog.debug('set xterio auth islogin=', f)
    this._islogin = f
  }

  private static async checkToken(_flag: string = 'init') {
    XterioAuthTokensManager.setTokens(XterioCache.tokens)

    const refresh_token = XterioAuthTokensManager.refreshToken
    let isvalid = this.isVaildIdToken
    if (!isvalid && refresh_token) {
      // token invalid, req tokens by refresh
      XLog.info('check token and refresh tokens')
      const res = await XterioAuthService.refreshTokenService(refresh_token)
      XterioAuthTokensManager.setTokens({ refresh_token, id_token: res.id_token, access_token: res.access_token })
      //again check
      isvalid = this.isVaildIdToken
    }
    XLog.info('check token and the idToken isvalid=', isvalid)
    this.setIsLogin(isvalid)
    if (!isvalid) {
      XLog.info('clear cache data')
      this.clearData()
    } else if (_flag === 'init') {
      //get userinfo
      await XterioAuthService.getUserInfo()
    }
    return XterioAuthTokensManager.idToken || ''
  }

  private static getCode() {
    const _type = XterioCache.loginType
    XLog.debug('check authorize status and _type=', _type)

    if (_type !== LoginType.Default && _type !== LoginType.Email) return ''

    const uri = XterioAuthInfo.config?.redirect_uri
    if (!uri || !location.href.startsWith(uri)) {
      XLog.error('not check, different redirect_uri')
      return ''
    }

    const queryParams = qs.parseUrl(location.href)
    let code = queryParams.query?.code
    if (Array.isArray(code)) {
      code = code?.[0]
    }
    if (!code) {
      XLog.error('no authorize')
      return ''
    } else {
      XLog.debug('code=', code)
      // XLog.debug('url=', location.href, queryParams.query)
      delete queryParams.query.code
      const _t = qs.stringify(queryParams.query)
      const new_url = queryParams.url + (_t ? '?' + _t : '')
      history.pushState(null, '', new_url)
    }
    return code
  }
  private static async codeLogin(code: string) {
    XLog.debug('going to code login ...')
    const res = await XterioAuthService.login(code as string)
    if (res?.uuid) {
      XterioCache.delete(XTERIO_CONST.LOGIN_TYPE)
    }
  }

  static async getIdToken() {
    /// idtoken not expired or refreshed if the promise return non-empty string
    return await this.checkToken('getIdToken')
  }

  static async init(config: Partial<ISSoTokensParams>, env?: Env) {
    const _env = env ?? Env.Dev
    const {
      app_id = '',
      client_id = '',
      client_secret = '',
      redirect_uri = '',
      mode = 'default',
      logout = _env === Env.Dev ? '0' : '1',
      logLevel = 1
    } = config
    setLogLevel(logLevel)
    const _baseURL = EnvVariableConfig[_env].API_BASE
    const _config: ISSoTokensParams = {
      app_id,
      client_id,
      client_secret,
      redirect_uri,
      response_type: 'code',
      scope: 'all',
      mode,
      grant_type: 'authorization_code',
      logout
    }
    XterioAuthInfo.app_id = app_id
    XterioAuthInfo.client_id = client_id
    XterioAuthInfo.env = _env
    XterioAuthInfo.baseURL = _baseURL
    XterioAuthInfo.pageURL = EnvVariableConfig[_env].PAGE_BASE
    const { response_type, scope } = _config
    XterioAuthInfo.authorizeUrl =
      _baseURL +
      `/account/v1/oauth2/authorize?` +
      qs.stringify({ client_id, redirect_uri, response_type, scope, mode, logout })
    XterioAuthInfo.config = _config
    XterioAuthInfo.PageUriApi = EnvVariableConfig[_env].PAGES_URI_API
    const data = await XterioAuthService.getPageUrlMap()
    XterioAuthInfo.pageUriMap = data.pages
    XterioAuthInfo.pageURL = data.domain ? `https://${data.domain}` : EnvVariableConfig[_env].PAGE_BASE

    XLog.debug('auth initial')

    // XterEventEmiter.clear()

    XterEventEmiter.subscribe((info: IUserInfo) => {
      XLog.debug('the userinfo callback count=', XterioAuthInfo.onAccount.length)
      XterioAuthInfo.onAccount.map((f) => f(info))
    })

    XterEventEmiter.subscribe(async () => {
      //req expired logic, remove idToken
      //loadingState 防止并发401处理
      LoadingState.getInstance().execute(async () => {
        XLog.debug('req 401, refresh token')
        this.setIsLogin(false)
        XterioAuthTokensManager.removeIdToken()
        XterEventEmiter.emit(XTERIO_EVENTS.LOGOUT)
        await this.checkToken()
      })
    }, XTERIO_EVENTS.Expired)

    // init XterAuthLoginModal
    // must init before async function
    XterAuthModal.init({ apiUrl: _baseURL, env: _env })
    XLog.debug(XterAuthModal.instance)

    const code = this.getCode()
    if (code) {
      await this.codeLogin(code)
    } else {
      await this.checkToken()
    }
  }
  private static clearData() {
    XterioAuthTokensManager.removeTokens()
    XterioAuthUserInfoManager.removeUserInfo()
  }
  static logout() {
    XLog.debug('logout success')
    this.clearData()
    this.setIsLogin(false)
    XterEventEmiter.emit(XTERIO_EVENTS.LOGOUT)
    XterAuthModal?.instance?.store?.removeUserState()
  }
  static async login(mode?: LoginType) {
    if (!XterioAuthInfo.config) {
      XLog.error('xterio auth sdk initial failed')
      return
    }
    if (mode && mode !== LoginType.Mini) {
      XterioAuthInfo.config = { ...XterioAuthInfo.config, mode }
      const { response_type, scope, logout, client_id, redirect_uri } = XterioAuthInfo.config
      XterioAuthInfo.authorizeUrl =
        XterioAuthInfo.baseURL +
        `/account/v1/oauth2/authorize?` +
        qs.stringify({ client_id, redirect_uri, response_type, scope, mode, logout })
    }
    if (this.isLogin) {
      XLog.debug('get userinfo')
      return XterioAuthService.getUserInfo()
    }

    if (mode === LoginType.Mini) {
      XterAuthModal.instance.open()
      return
    }

    XterioCache.loginType = mode || LoginType.Default

    //go to authorize
    XLog.debug('going to authorize ...')
    location.href = XterioAuthInfo.authorizeUrl
  }
  static getUserInfo(callback: (res: IUserInfo) => void) {
    XterioAuthInfo.onAccount.push(callback)
    if (XterioAuth.userinfo) {
      callback(XterioAuth.userinfo)
    }
  }
  static openPage = openPage
  static getOtac = getOtac
}

/**
 * how to get user info, recommend way2.
 * way1:XterioAuth.userinfo
 * way2:XterioAuth.getUserInfo((info)=>{})
 * way3:XterEventEmiter.subscribe((info) => {})
 */
