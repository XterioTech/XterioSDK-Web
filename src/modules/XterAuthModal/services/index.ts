import { getFetcher, postFetcher } from 'utils/fetchers'
import qs from 'query-string'
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

export interface IProfile {
  isLogin: boolean
  uuid?: string
  email?: string
  username?: string
  avatar?: string
  source?: number // 0：email，1：facebook，2：google
  created_at?: number
  password?: number // 0: 未设置；1：已设置
}

interface IProfileServiceResError {
  err_code: number
  uuid?: string
}

interface IRefreshServiceRes {
  id_token?: string
  access_token?: string
}

interface IRefreshServiceBody {
  refresh_token: string
}

export const loginService = async (username: string, password: string): Promise<ILoginServiceRes> => {
  const res = await postFetcher<ILoginServiceRes, ILoginServiceBody>('/account/v1/login', {
    // 'h-recaptcha-response': response,
    username,
    password
  }).catch((e) => {
    console.error(e)
    return {
      ...e,
      error: true
    } as ILoginServiceResError
  })
  return res?.error ? { ...res, error: true } : { ...res, error: false }
}

export const getProfileService = async (Authorization?: string, _s?: string): Promise<IProfile> => {
  // s 参数只用于 sso 登陆，服务端用此参数串流程
  const s = _s || qs.parse(location.search)?.s || ''
  const res = await getFetcher<IProfile>('/account/v1/user/profile', { s }, Authorization).catch((e) => {
    return {
      ...e,
      error: true
    } as IProfileServiceResError
  })
  return res.uuid ? { ...res, isLogin: true } : { isLogin: false }
}

export const refreshTokenService = async (refresh_token: string): Promise<IRefreshServiceRes> => {
  return postFetcher<IRefreshServiceRes, IRefreshServiceBody>('/auth/v1/refresh', {
    refresh_token
  }).catch(() => {
    return {}
  })
}

export const registerService = async ({
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
}> => {
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
  return res?.error ? { error: true, err_code: res.err_code } : { error: false }
}

interface IRegisterConfirmServiceBody extends Omit<ILoginServiceBody, 'h-recaptcha-response'> {
  code: string
}

export const registerConfirmService = async ({
  username,
  password,
  code
}: {
  username: string
  password: string
  code: string
}): Promise<ILoginServiceRes> => {
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
  return res.error ? res : { ...res, error: false }
}

export const sendForgotCodeService = async ({ email }: { email: string }): Promise<ILoginServiceRes> => {
  const res = await postFetcher<ILoginServiceRes, { username: string }>('/account/v1/password/forgot?source=forgot', {
    username: email
  }).catch((e) => {
    return {
      error: true,
      err_code: e.err_code
    } as ILoginServiceResError
  })
  return res.error ? res : { ...res, error: false }
}

export const resetPassword = async ({ email, code, password }: { email: string; code: string; password: string }) => {
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
  return res.error ? res : { ...res, error: false }
}
