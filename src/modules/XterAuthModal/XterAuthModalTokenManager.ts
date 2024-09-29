import { XterioCache } from 'modules/XterCache'

export class XterAuthModalTokenManager {
  public accessToken: string | undefined
  public refreshToken: string | undefined
  public idToken: string | undefined

  constructor() {
    this.accessToken = XterioCache.tokens?.access_token
    this.refreshToken = XterioCache.tokens?.refresh_token
    this.idToken = XterioCache.tokens?.id_token
  }

  public setTokens({
    accessToken,
    refreshToken,
    idToken
  }: {
    accessToken: string
    refreshToken: string
    idToken: string
  }) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.idToken = idToken
    XterioCache.tokens = { access_token: accessToken, id_token: idToken, refresh_token: refreshToken }
  }

  public removeTokens() {
    this.accessToken = undefined
    this.refreshToken = undefined
    this.idToken = undefined
    XterioCache.deleteTokens()
  }
}
