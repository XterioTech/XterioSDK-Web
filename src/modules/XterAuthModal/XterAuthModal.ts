import './styles/common.scss'
import './styles/login-modal.scss'
import { Logo } from './ui'
import { EAuthState } from './enums'
import { BaseModalState } from './BaseModalState'
import { XterAuthModalSignIn } from './XterAuthModalSignIn'
import { XterAuthModalSignUp } from './XterAuthModalSignUp'
import { XterAuthModalForgetPwd } from './XterAuthModalForgetPwd'
import { XterAuthModalStore } from './XertAuthModalStore'
import { XterAuthModalSignUpCode } from './XterAuthModaSignUpCode'
import { ModalExtraData } from './interfaces'
import { XterAuthModaPwdSuccess } from './XterAuthModaPwdSuccess'
import { generateSVGIcon } from 'ui/svg-icon'
import { Env } from 'interfaces/loginInfo'
import { HCaptchaScriptURL } from './constant'
import { disableCaptchaVerify } from './utils/config'

type InitParams = {
  apiUrl: string
  env?: Env
}
export class XterAuthModal {
  private static _instance: XterAuthModal
  public modalContainer?: HTMLElement
  private modalOverlay?: HTMLElement
  private currentState: BaseModalState

  public apiUrl: string
  public env: Env
  public store

  constructor({ apiUrl, env }: InitParams) {
    this.apiUrl = apiUrl
    this.env = env || Env.Dev

    this.initHCaptcha()

    this.currentState = new XterAuthModalSignIn(this)

    this.store = new XterAuthModalStore()
  }

  public static get instance(): XterAuthModal {
    if (!XterAuthModal._instance) {
      throw new Error('Xterio Auth SDK is not initialized. Call XterioAuth.init({apiUrl, env}) first.')
    }
    return XterAuthModal._instance
  }

  public static init({ apiUrl, env }: InitParams): void {
    if (!XterAuthModal._instance) {
      XterAuthModal._instance = new XterAuthModal({ apiUrl, env })
    }
  }

  private initHCaptcha() {
    if (disableCaptchaVerify) return
    const script = document.createElement('script')
    script.src = HCaptchaScriptURL
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }

  public open(): void {
    const modalOverlay = document.createElement('div')
    modalOverlay.className = 'xa-modal-overlay'
    this.modalOverlay = modalOverlay
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        // this.close() //TEMP disable close if click overlay
      }
    })

    const modalContainer = document.createElement('div')
    this.modalContainer = modalContainer
    modalContainer.className = 'xa-modal'

    this.renderCommonElement(modalContainer)

    modalOverlay.appendChild(modalContainer)
    document.body.appendChild(modalOverlay)

    this.currentState.render()
  }

  public close(): void {
    this.modalContainer?.remove()
    this.modalOverlay?.remove()
  }

  private renderCommonElement(_container: HTMLElement) {
    // Logo
    const logo = new Logo()
    _container.appendChild(logo.getElement())

    //Close
    const iconClose = generateSVGIcon('icon-close', 24, '#838383')
    iconClose.addEventListener('click', () => this.close())
    iconClose.className = 'xa-signin-close'
    _container.appendChild(iconClose)

    // Title
    const titleContainer = document.createElement('div')
    titleContainer.className = 'xa-signin-title-container'
    titleContainer.innerHTML = `
        <h3 class="xa-signin-title">Sign in</h3>
        <p class="xa-signin-sub-title">Sign in with email</p>
        <div class="xa-signin-title-email"></div>
       `

    _container.appendChild(titleContainer)
  }

  public setTitle(title: string, subTitle: string, extraTitle?: string) {
    const titleContainer = document.querySelector('.xa-signin-title')
    const subTitleContainer = document.querySelector('.xa-signin-sub-title')
    const thirdTitleContainer = document.querySelector('.xa-signin-title-email')
    titleContainer!.innerHTML = title
    subTitleContainer!.innerHTML = subTitle
    if (thirdTitleContainer && extraTitle) thirdTitleContainer!.innerHTML = extraTitle
  }

  private renderContent() {
    // render 不同状态的内容前先清空内容
    if (this.modalContainer) {
      this.modalContainer.innerHTML = ''

      this.renderCommonElement(this.modalContainer)
    }
    this.currentState.render()
    // this.currentState.addEventListeners(this)
  }

  public switchModalState(state: EAuthState, data?: ModalExtraData) {
    switch (state) {
      case 'login':
        this.currentState = new XterAuthModalSignIn(this, data)
        break
      case 'signup':
        this.currentState = new XterAuthModalSignUp(this, data)
        break
      case 'signupCode':
        this.currentState = new XterAuthModalSignUpCode(this, data)
        break
      case 'forgotPassword':
        this.currentState = new XterAuthModalForgetPwd(this, data)
        break
      case EAuthState.PasswordSuccess:
        this.currentState = new XterAuthModaPwdSuccess(this, data)
        break
    }
    this.renderContent()
  }
}
