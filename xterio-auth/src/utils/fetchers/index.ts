import qs from 'query-string'
import { IResponse } from './interfaces'
import { XterioAuthInfo } from 'modules/XterAuthInfo'
import { getPackageVersion, randomNonceStr } from 'utils/logger'
import { XterioCache } from 'modules/XterCache'

async function resolveResp<T>(resp: Response): Promise<T> {
  const res: IResponse<T> = await resp.json()
  if (res.err_code != 0) {
    if (resp.status === 401 && res.err_code === 91001) {
      // TOAST.noti('error', 'Your session has expired, please sign in again.')
      // loginEvent.emit('Expired')
    } else if (resp.status === 429) {
      // TOAST.noti('error', 'Operating too frequently, please try again later.')
    }
    return Promise.reject(res)
    // throw new Error(`[${res.err_code}]: ${res.err_msg}`)
  }
  return res.data
}

function fullUrl(apiPath: string, apiBase?: string): string {
  if (!apiBase || /^https?:\/\//i.test(apiPath)) {
    return apiPath
  }
  if (apiPath.startsWith('/')) {
    return `${apiBase}${apiPath}`
  } else {
    return `${apiBase}/${apiPath}`
  }
}

interface FetcherConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  params?: Record<string, unknown>
  headers?: Record<string, string>
  data?: unknown
  Authorization?: string
}

const fetcher = async <T>({ method, path, params, headers, data, Authorization }: FetcherConfig): Promise<T> => {
  if (!XterioAuthInfo.client_id) {
    throw new Error('You need set xterio-auth info')
  }

  if (params) {
    const queryParam = qs.stringify(params)
    path += (path.includes('?') ? '&' : '?') + `${queryParam}`
  }
  const url = fullUrl(path, XterioAuthInfo.baseURL)

  const requestOptions: RequestInit = {
    method,
    headers: {
      'content-type': 'application/json',
      sdkVersion: getPackageVersion(),
      platform: 'pc',
      clientId: XterioAuthInfo.client_id,
      timestamp: Date.now().toString(),
      language: 'en',
      nonce: randomNonceStr(),
      Authorization: Authorization || XterioCache.tokens?.id_token || '',
      ...headers
    }
  }

  if (data) {
    // PUT 和 application/x-www-form-urlencoded 提交的是表单数据，不能stringify
    const needStringify = method !== 'PUT' && headers?.['content-type'] !== 'application/x-www-form-urlencoded'
    requestOptions.body = needStringify ? JSON.stringify(data) : (data as ReadableStream)
  }

  const req = new Request(url, requestOptions)
  try {
    const resp = await fetch(req)
    return method === 'PUT' ? (resp as T) : resolveResp<T>(resp)
  } catch {
    throw new Error('Network error')
  }
}

export async function getFetcher<T>(
  path: string,
  params?: Record<string, unknown>,
  Authorization?: string
): Promise<T> {
  return fetcher({
    method: 'GET',
    path,
    params,
    Authorization
  })
}

export async function postFetcher<T, D>(
  path: string,
  data: D,
  Authorization?: string,
  headers?: Record<string, string>
): Promise<T> {
  return fetcher({
    method: 'POST',
    path,
    data,
    headers,
    Authorization
  })
}

export async function deleteFetcher<T, D>(path: string, data: D): Promise<T> {
  return fetcher({
    method: 'DELETE',
    path,
    data
  })
}

export async function putFetcher<T, D>(path: string, data: D, headers?: Record<string, string>): Promise<T> {
  return fetcher({
    method: 'PUT',
    path,
    data,
    headers
  })
}

export async function patchFetcher<T, D>(
  path: string,
  data: D,
  headers?: Record<string, string>,
  Authorization?: string
): Promise<T> {
  return fetcher({
    method: 'PATCH',
    path,
    data,
    headers,
    Authorization
  })
}
