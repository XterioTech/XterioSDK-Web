import { ModalObservable } from './ModalObservable'
import { XterAuthModalTokenManager } from './XterAuthModalTokenManager'
import { XterioAuthService } from 'modules/AuthService'
import { IUserInfo } from 'interfaces/loginInfo'
import { XterioCache } from 'modules/XterCache'
import { XterioAuth } from 'modules/XterAuth'
import { XterEventEmiter } from 'modules/XterEventEmitter'

interface UserState {
  isLogin: boolean
  userInfo: IUserInfo | null
}
export class XterAuthModalStore extends ModalObservable {
  public userState: UserState = { isLogin: false, userInfo: null }
  public tokenManager: XterAuthModalTokenManager

  constructor() {
    super()

    this.tokenManager = new XterAuthModalTokenManager()

    this.refreshUserInfo()

    this.listenStateChange()
  }

  private listenStateChange() {
    const _userState: UserState = {
      isLogin: false,
      userInfo: null
    }
    this.userState = new Proxy(_userState, {
      set: (target, prop, value) => {
        if (target[prop as keyof UserState] !== value) {
          target[prop as keyof UserState] = value
          this.setPersistUserInfo()
          this.notify()
        }
        return true
      }
    })
  }

  // 用户登录方法
  public async login(username: string, password: string, hcaptchaResponseToken?: string) {
    const { error, err_code, access_token, id_token, refresh_token } = await XterioAuthService.loginService(
      username,
      password,
      hcaptchaResponseToken
    )

    if (!error && access_token && refresh_token) {
      this.tokenManager.setTokens({ accessToken: access_token, refreshToken: refresh_token, idToken: id_token })

      await this.getUserInfo()

      this.userState.isLogin = true
    } else {
      this.userState.isLogin = false
    }

    return { error: !!error, err_code }
  }

  public async confirmSignUpLogin({ username, password, code }: { username: string; password: string; code: string }) {
    const { error, err_code, access_token, id_token, refresh_token } = await XterioAuthService.registerConfirmService({
      username,
      password,
      code
    })

    if (!error && access_token && refresh_token) {
      this.tokenManager.setTokens({ accessToken: access_token, refreshToken: refresh_token, idToken: id_token })

      await this.getUserInfo()

      this.userState.isLogin = true
    } else {
      this.userState.isLogin = false
    }
    return { error: !!error, err_code }
  }

  private async getUserInfo() {
    const profile = await XterioAuthService.getUserInfo()
    if (profile && profile.uuid) {
      this.userState.userInfo = { ...this.userState.userInfo, ...profile }
      this.userState.isLogin = true
    }
    return profile
  }

  private setPersistUserInfo() {
    if (this.userState.userInfo) {
      XterioCache.userInfo = this.userState.userInfo
    }
  }

  public getPersistUserInfo() {
    return XterioCache.userInfo
  }

  private async refreshUserInfo() {
    XterEventEmiter.subscribe((res: IUserInfo) => {
      this.userState.userInfo = res
      this.userState.isLogin = XterioAuth.isLogin
    })
    /*
    const { refreshToken, idToken } = this.tokenManager
    if (refreshToken && !idToken) {
      const res = await refreshTokenService(refreshToken)
      this.tokenManager.setTokens({
        accessToken: res.access_token ?? '',
        refreshToken: refreshToken,
        idToken: res.id_token ?? ''
      })
    }
    if (this.tokenManager.idToken) {
      await this.getUserInfo()
    } else {
      this.logout()
    }
    */
    //tip: 此处刷新token逻辑已放到 XterioAuth中处理了
    if (!this.tokenManager.idToken) {
      this.logout()
    }
  }

  // 用户登出方法
  public logout(): void {
    this.userState.isLogin = false
    this.userState.userInfo = null

    this.tokenManager.removeTokens()
  }
}
