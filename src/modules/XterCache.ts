import type { ITokenRes, IUserInfo } from 'interfaces/loginInfo'
import { XTERIO_CONST } from 'utils'

export class XterioCache {
  static set loginType(_type: string) {
    localStorage.setItem(XTERIO_CONST.LOGIN_TYPE, _type)
  }
  static get loginType(): string | undefined {
    const _type = localStorage.getItem(XTERIO_CONST.LOGIN_TYPE)
    return _type ? _type : undefined
  }
  static set tokens(value: Partial<ITokenRes>) {
    const { access_token = '', id_token = '', refresh_token = '' } = value
    localStorage.setItem(XTERIO_CONST.ACCESS_TOKEN, access_token)
    localStorage.setItem(XTERIO_CONST.ID_TOKEN, id_token)
    localStorage.setItem(XTERIO_CONST.REFRESH_TOKEN, refresh_token)
  }
  static get tokens(): ITokenRes {
    const _t: ITokenRes = {
      access_token: localStorage.getItem(XTERIO_CONST.ACCESS_TOKEN) || '',
      id_token: localStorage.getItem(XTERIO_CONST.ID_TOKEN) || '',
      refresh_token: localStorage.getItem(XTERIO_CONST.REFRESH_TOKEN) || ''
    }
    return _t
  }
  static deleteTokens(key?: string) {
    if (key) {
      localStorage.removeItem(key)
    } else {
      localStorage.removeItem(XTERIO_CONST.ACCESS_TOKEN)
      localStorage.removeItem(XTERIO_CONST.REFRESH_TOKEN)
      localStorage.removeItem(XTERIO_CONST.ID_TOKEN)
    }
  }

  static set userInfo(value: IUserInfo) {
    localStorage.setItem(XTERIO_CONST.USERINFO, JSON.stringify(value))
  }
  static get userInfo(): IUserInfo | undefined {
    const value = localStorage.getItem(XTERIO_CONST.USERINFO)
    try {
      if (value) {
        return JSON.parse(value)
      }
    } catch (err) {
      return undefined
    }
    return undefined
  }
  static deleteUserInfo() {
    localStorage.removeItem(XTERIO_CONST.USERINFO)
  }
  static delete(key: string) {
    localStorage.removeItem(key)
  }
  static set(key: string, value: string) {
    localStorage.setItem(key, value)
  }
  static get(key: string) {
    return localStorage.getItem(key) || ''
  }
}
