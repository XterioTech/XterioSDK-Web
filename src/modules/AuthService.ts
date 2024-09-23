import type {
  IUserInfo,
  ITokenRes,
  IUserInfoRes,
  IWalletItem,
  ILoginServiceRes,
  ILoginServiceBody,
  ILoginServiceResError,
  IRefreshServiceRes,
  IRefreshServiceBody,
  IRegisterConfirmServiceBody
} from 'interfaces/loginInfo'
import { log } from 'utils'
import { XterioAuthInfo, XterioAuthTokensManager, XterioAuthUserInfoManager } from './XterAuthInfo'
import { XterEventEmiter } from './XterEventEmitter'
import { XTERIO_EVENTS } from 'utils/const'
import { getFetcher, postFetcher } from 'utils/fetchers'

export class XterioAuthService {
  /**
   * 平台登录
   * @param code 授权code
   * @returns Promise < IUserInfo | null >
   */
  static async login(code: string) {
    const { client_id = '', client_secret = '', redirect_uri = '', grant_type = '' } = XterioAuthInfo.config || {}
    const param = { client_id, client_secret, redirect_uri, grant_type, code }
    const data = new URLSearchParams(param)
    log('go login')

    const res = await postFetcher<ITokenRes, typeof data>(`/account/v1/oauth2/token`, data, '', {
      ['content-type']: 'application/x-www-form-urlencoded'
    })
      .then((res) => {
        log('login success.')
        XterioAuthTokensManager.setTokens(res)
        return res
      })
      .catch((err) => {
        log('login failed.')
        return null
      })
    if (res?.id_token) {
      log('get userinfo')
      const info = await this.getUserInfo()
      if (info.uuid) {
        return info
      }
    }
    return null
  }

  /**
   * 查询平台用户信息
   * @returns
   */
  static async getUserInfo(): Promise<IUserInfo> {
    const [profileInfo, wallet] = await Promise.all([this.getProfile(), this.getWallet()])
    const res = {
      ...profileInfo,
      wallet
    }
    XterioAuthUserInfoManager.setUserInfo(res)
    if (res?.uuid) {
      XterEventEmiter.emit(XTERIO_EVENTS.ACCOUNT, res)
    }
    return res
  }

  private static async getProfile(): Promise<IUserInfoRes> {
    const res = await getFetcher<IUserInfoRes>(`/account/v1/user/profile`)
      .then((res) => {
        log('get profile success.')
        return res
      })
      .catch((err) => {
        log('get profile failed.')
        return null
      })

    return res?.uuid ? { ...res } : {}
  }

  private static async getWallet(): Promise<IWalletItem[]> {
    const res = await getFetcher<{ wallet: IWalletItem[] }>(`/account/v1/wallet`)
      .then((res) => {
        log('get wallet success.')
        return res
      })
      .catch((err) => {
        log('get wallet failed.')
        return null
      })
    return res?.wallet || []
  }

  /**
   * tt login
   * @param username username
   * @param password password
   * @returns Promise <ILoginServiceRes>
   */
  static async loginService(username: string, password: string): Promise<ILoginServiceRes> {
    const res = await postFetcher<ILoginServiceRes, ILoginServiceBody>('/account/v1/login', {
      username,
      password
    }).catch((e) => {
      return {
        ...e,
        error: true
      } as ILoginServiceResError
    })
    log('ttl login', res?.error ? 'failed' : 'success')
    if (!res?.error) {
      XterioAuthTokensManager.setTokens(res)
    }
    return res?.error ? { ...res, error: true } : { ...res, error: false }
  }

  /**
   * refresh tokens
   * @param refresh_token string
   * @returns Promise<IRefreshServiceRes>
   */
  static refreshTokenService(refresh_token: string): Promise<IRefreshServiceRes> {
    return postFetcher<IRefreshServiceRes, IRefreshServiceBody>('/auth/v1/refresh', {
      refresh_token
    }).catch(() => {
      return {}
    })
  }

  static async registerService({
    username,
    password,
    subscribe
  }: {
    username: string
    password: string
    subscribe: boolean
  }): Promise<{
    error: boolean
    err_code?: string | number
  }> {
    const res = await postFetcher<object, ILoginServiceBody>('/account/v1/register', {
      username,
      password,
      subscribe: subscribe ? 1 : 0,
      invite_code: '', // sdk 暂不支持 invite_code
      'h-recaptcha-response': '' // sdk 暂不支持 recaptch
    }).catch((e) => {
      return {
        ...e,
        error: true
      }
    })
    return res?.error ? { error: true, err_code: res?.err_code } : { error: false }
  }

  static async registerConfirmService({
    username,
    password,
    code
  }: {
    username: string
    password: string
    code: string
  }): Promise<ILoginServiceRes> {
    const res = await postFetcher<ILoginServiceRes, IRegisterConfirmServiceBody>('/account/v1/register/code/confirm', {
      username,
      code,
      password
    }).catch((e) => {
      return {
        error: true,
        err_code: e.err_code
      } as ILoginServiceResError
    })
    if (!res?.error) {
      XterioAuthTokensManager.setTokens(res)
    }
    return res?.error ? res : { ...res, error: false }
  }

  static async sendForgotCodeService({ email }: { email: string }): Promise<ILoginServiceRes> {
    const res = await postFetcher<ILoginServiceRes, { username: string }>('/account/v1/password/forgot?source=forgot', {
      username: email
    }).catch((e) => {
      return {
        error: true,
        err_code: e.err_code
      } as ILoginServiceResError
    })
    return res?.error ? res : { ...res, error: false }
  }

  static async resetPassword({ email, code, password }: { email: string; code: string; password: string }) {
    const res = await postFetcher<
      ILoginServiceRes,
      {
        username: string
        password: string
        confirmation_code: string
      }
    >('/account/v1/password/forgot/confirm', {
      username: email,
      password,
      confirmation_code: code
    }).catch((e) => {
      return {
        error: true,
        err_code: e.err_code
      } as ILoginServiceResError
    })
    return res?.error ? res : { ...res, error: false }
  }

  static async getOtacByTokens() {
    const id_token = XterioAuthTokensManager.idToken
    const refresh_token = XterioAuthTokensManager.refreshToken
    const access_token = XterioAuthTokensManager.accessToken
    if (!id_token || !refresh_token) {
      return ''
    }
    const res = await postFetcher<{ code?: string }, unknown>(`/auth/v1/otac`, {
      access_token,
      id_token,
      refresh_token
    }).catch(() => {
      return { code: '' }
    })
    return res?.code || ''
  }
}
