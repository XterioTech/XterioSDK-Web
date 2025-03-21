import { Env } from 'interfaces/loginInfo'
import { XTER_TOPUP_URLS } from './config'
import { TopupFrameConfig, XterTopupMethod, PostData, TopupUrlConfig, PostMessageType } from './types'
import { XterioAuthService } from 'modules/AuthService'
import { XterioAuth } from 'modules/XterAuth'
import './styles/xter-topup.scss'
import { XterioAuthInfo } from 'modules/XterAuthInfo'
import { isSafariOrIphone } from 'utils/device'

export type { TopupFrameConfig, PostData }
export { XterTopupMethod }

export class XterTopup {
  private container: HTMLElement | null = null
  private iframe: HTMLIFrameElement | null = null
  private config: TopupFrameConfig
  private TopupUrlConfig: TopupUrlConfig
  private otac = ''
  private env = Env.Dev

  constructor(config: TopupFrameConfig, customTopupUrlConfig?: TopupUrlConfig) {
    this.config = {
      ...config
    }
    this.env = XterioAuthInfo.env

    this.TopupUrlConfig = customTopupUrlConfig || XTER_TOPUP_URLS[this.env!]
    this.setupMessageListener()
  }

  private setupMessageListener() {
    window.addEventListener('message', this.handleMessage)
  }

  private handleMessage = (event: MessageEvent<PostData>) => {
    console.log(this.TopupUrlConfig.defaultTopupUrl, 'urll')
    if (event.origin === new URL(this.TopupUrlConfig.defaultTopupUrl).origin) {
      const { type, data } = event.data

      switch (type) {
        case PostMessageType.Closed:
          this.config.onClose?.(event.data)
          this.destroy()
          break
        case PostMessageType.SuccessClosed:
          this.config.onSuccessClose?.(event.data)
          this.destroy()
          break
      }
    }
  }

  /**
   * 关闭支付页面
   */
  public close() {
    // 清空容器内容
    if (this.container) {
      this.container.innerHTML = ''
    }

    // 清理引用
    this.iframe = null
    this.container = null

    // 移除消息监听
    window.removeEventListener('message', this.handleMessage)

    this.config.onClose?.()
  }

  public destroy() {
    this.close()
  }

  public async openPay(container: string | HTMLElement, method: XterTopupMethod = XterTopupMethod.Default) {
    this.container = this.getContainer(container)

    this.container.style.position = 'relative'
    this.container.innerHTML = ''

    const errMsg = `[XterTopup] Authentication failed, please login first before open topup page.`
    const authFailedException = new Error(errMsg)
    if (!XterioAuth.isLogin) {
      console.error(errMsg)
      throw authFailedException
    }
    let otac = ''
    try {
      otac = await XterioAuthService.getOtacByTokens()
      if (!otac) {
        throw authFailedException
      }
      this.otac = otac
    } catch (error) {
      throw authFailedException
    }

    // 显示加载动画
    const loadingElement = this.renderLoadingElement()
    this.container.appendChild(loadingElement)

    // 渲染 iframe
    await this.renderTopupIframe(method, () => {
      // 移除加载动画
      if (loadingElement.parentNode === this.container) {
        this.container?.removeChild(loadingElement)
      }
      // 显示 iframe
      if (this.iframe) {
        this.iframe.style.opacity = '1'
      }
      this.config.onLoad?.()
    })
  }

  private getContainer(container: string | HTMLElement): HTMLElement {
    if (typeof container === 'string') {
      const element = document.querySelector(container)
      if (!element) {
        throw new Error(`[XterTopup] Container not found: ${container}`)
      }
      return element as HTMLElement
    }
    return container
  }

  private async getIframeSrc(method: XterTopupMethod): Promise<string> {
    const baseUrl = method === 'default' ? this.TopupUrlConfig.defaultTopupUrl : this.TopupUrlConfig.fiatTopupUrl

    const params = new URLSearchParams({
      spu_id: this.config.spuId?.toString(),
      game_id: XterioAuthInfo.app_id,
      sku_id: this.config.skuId?.toString(),
      hide_header: String(!!this.config?.xterViewCustomOptions.hide_header),
      hide_footer: String(!!this.config.xterViewCustomOptions.hide_footer),
      show_modal: String(!!this.config.showModal),
      _otac: this.otac
    })
    if (isSafariOrIphone()) {
      params.append('_otac_login_side', 'client')
    }

    return `${baseUrl}?${params.toString()}`
  }

  async renderTopupIframe(method: XterTopupMethod, loadCallback: () => void) {
    try {
      this.iframe = document.createElement('iframe')
      this.iframe.className = 'xa-topup-main-iframe'
      this.iframe.style.width =
        typeof this.config.width === 'number' ? `${this.config.width}px` : this.config.width || '100%'
      this.iframe.style.height =
        typeof this.config.height === 'number' ? `${this.config.height}px` : this.config.height || '100%'

      this.iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      this.iframe.allowFullscreen = true

      this.iframe.onload = () => {
        loadCallback()
      }

      // 设置 iframe 的 src 并添加到容器
      this.iframe.src = await this.getIframeSrc(method)
      this.container?.appendChild(this.iframe)
    } catch (error) {
      console.error('Failed to open payment:', error)
      // 发生错误时显示错误信息
      // this.renderError()
      throw error
    }
  }

  private renderLoadingElement(): HTMLDivElement {
    const loadingDiv = document.createElement('div')
    loadingDiv.className = 'xa-topup-loading-container'
    loadingDiv.innerHTML = `<div class="xa-topup-loading-spinner"></div>`
    return loadingDiv
  }

  // private renderNotLoginElement(): HTMLDivElement {
  //   const notLoginDiv = document.createElement('div')
  //   notLoginDiv.className = 'xa-topup-empty'
  //   notLoginDiv.textContent = 'Not Login yet'
  //   return notLoginDiv
  // }

  // private renderError() {
  //   if (this.container) {
  //     this.container.innerHTML = ''
  //     const errorDiv = document.createElement('div')
  //     errorDiv.className = 'xa-toup-error-container'

  //     errorDiv.textContent = 'Failed to load payment page'
  //     this.container.appendChild(errorDiv)
  //   }
  // }
}
