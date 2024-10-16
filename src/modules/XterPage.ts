import { OpenPageMode, PageOptionParam, PageType } from 'interfaces/loginInfo'
import { XterioAuthInfo } from './XterAuthInfo'
import { XLog } from 'utils/logger'
import qs from 'query-string'
import { addCssText, convertStyleToArray, getDiv, getIframe } from 'utils/dom'
import { XterioAuth } from './XterAuth'
import { XterioAuthService } from './AuthService'
import { iconContentMap } from 'ui/svg-icon'

const getOtac = async () => {
  //tip: otac invalid when used once
  if (XterioAuth.isLogin) {
    const otac = await XterioAuthService.getOtacByTokens()
    return otac || ''
  }
  return ''

  /*
  if (XterioAuth.isLogin) {
    // User is logged in or the login token is expiring soon
    if (!XterioAuthInfo?.otac) {
      const otac = await XterioAuthService.getOtacByTokens()
      if (otac) {
        XterioAuthInfo.otac = otac
        // Set a timer to clear the otac after 2 minutes
        setTimeout(
          () => {
            XterioAuthInfo.otac = ''
          },
          2 * 60 * 1000
        )
      }
    }
  }
  return XterioAuthInfo?.otac || ''
  */
}

export const openPage = async (page: PageType, mode?: OpenPageMode, options?: PageOptionParam) => {
  const { active = 'ingame', keyword, collection, features, alertConfig, ...rest } = options || {}
  const _type = mode || OpenPageMode.alert
  const app_id = XterioAuthInfo.config?.app_id || ''
  if (!app_id) {
    throw new Error('You must set xterio-auth app_id')
  }
  const basePage = XterioAuthInfo.pageURL
  let uri = ''
  if (page === PageType.asset) {
    uri = `${basePage}/asset?source=1&app_id=${app_id}&active=${active}`
  } else if (page === PageType.account) {
    uri = `${basePage}/settings?source=1`
  } else if (page === PageType.wallet) {
    uri = `${basePage}/settings?source=1&tab=wallet`
  } else if (page === PageType.nft) {
    let query: Record<string, unknown> = { source: 1, app_id }
    if (collection) {
      query = { ...query, collection }
    }
    if (keyword) {
      query = { ...query, keyword: encodeURIComponent(keyword) }
    }
    if (features) {
      query = { ...query, features: encodeURIComponent(JSON.stringify(features)) }
    }
    uri = `${basePage}/marketplace?${qs.stringify(query)}`
  }

  if (rest) {
    uri += `&${qs.stringify(rest)}`
  }
  const otac = await getOtac()
  if (otac) {
    uri += `&_otac=${otac}`
  }

  XLog.debug('open xerio page uri:', uri)
  if (_type === OpenPageMode.iframeUri) {
    return uri
  }
  if (_type === OpenPageMode.iframeDom) {
    const { iframe } = getIframe(uri)
    return iframe
  }
  if (_type === OpenPageMode.page) {
    location.href = uri
  }
  if (_type === OpenPageMode.alert) {
    alertIframeLogic(uri, alertConfig)
    return
  }
}

const alertIframeLogic = (uri: string, config: PageOptionParam['alertConfig']) => {
  const { placement = 'right', style = { width: '100%', height: '100%' }, showCloseIcon = true } = config || {}
  const { iframeDiv, shadow } = getIframe(uri)
  if (showCloseIcon) {
    const { element: closeDiv, remove: unsubscribe } = getDiv('close-icon pointer', () => {
      shadow.remove()
      unsubscribe?.()
    })
    addCssText(closeDiv, `position:absolute;top:16px;left:16px;`)
    closeDiv.innerHTML = iconContentMap['icon-close-iframe']
    iframeDiv.appendChild(closeDiv)
  }
  document.body.appendChild(shadow)
  //update style, style > placement
  const _styArr = []
  _styArr.push('margin-top', `calc((100% - ${style.height}) / 2)`)
  if (placement === 'right') {
    _styArr.push('margin-left', `calc(100% - ${style.width})`)
  } else if (placement === 'center') {
    _styArr.push('margin-left', `calc((100% - ${style.width}) / 2)`)
  }
  _styArr.push(...convertStyleToArray(style))
  addCssText(iframeDiv, ..._styArr)
}
