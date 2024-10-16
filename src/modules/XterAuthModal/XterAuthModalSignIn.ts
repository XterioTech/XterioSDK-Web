import { BaseModalState } from './BaseModalState'
import { EAuthState } from './enums'
import { Button, Input } from './ui'
import { XterAuthModal } from './XterAuthModal'
import { ModalExtraData } from './interfaces'
import { XterAuthModalForm } from './XterAuthModalForm'
import { validateEmail, validatePassword } from './utils'
import { XterModalFormItem } from './XterAuthModalFormItem'
import { EnvVariableConfig } from 'utils'
import { disableCaptchaVerify } from './utils/config'
import { XterioAuthService } from 'modules/AuthService'

enum FomrItemsName {
  Email = 'email',
  Password = 'password'
}

export class XterAuthModalSignIn extends BaseModalState {
  private loginButton: Button | null
  private emailInput: Input | null
  private pwdInput: Input | null
  form: XterAuthModalForm

  constructor(modal: XterAuthModal, extraData?: ModalExtraData) {
    super(modal)
    this.loginButton = null
    this.emailInput = null
    this.pwdInput = null

    this.form = new XterAuthModalForm()
  }

  render(): void {
    if (!this.modal.modalContainer) return

    const _container = this.modal.modalContainer

    this.modal.setTitle('Sign in', 'Sign in with email')

    // Email Input
    this.renderEmailInput(_container)

    // Password Input
    this.renderPwdInput(_container)

    // hCaptcha
    this.renderHcaptcha(_container)

    // tips
    this.renderTips(_container)

    // login button
    this.renderLoginButton(_container)

    this.setupListeners()
  }

  private renderEmailInput(_container: HTMLElement) {
    const emailInput = new Input({
      label: 'EMAIL',
      type: 'text',
      showClearIcon: true,
      onChange: (value) => {
        this.form.clearFormItemError(FomrItemsName.Email)
        this.handleEmailChange(value)
      },
      onBlur: (value) => {
        this.form.findFormItem(FomrItemsName.Email)?.setError(validateEmail(value))
        this.handleEmailChange(value)
      }
    })
    this.emailInput = emailInput
    const formItem = new XterModalFormItem(FomrItemsName.Email, emailInput.getElement(), () => {
      return emailInput.getValue()
    })
    this.form.add(FomrItemsName.Email, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderPwdInput(_container: HTMLElement) {
    const pwdInput = new Input({
      label: 'PASSWORD',
      type: 'password',
      showClearIcon: true,
      onChange: (value) => {
        this.handlePasswordChange(value)
      },
      onBlur: (value) => {
        this.form.findFormItem(FomrItemsName.Password)?.setError(validatePassword(value))
        this.handlePasswordChange(value)
      }
    })
    this.pwdInput = pwdInput
    const formItem = new XterModalFormItem(FomrItemsName.Password, pwdInput.getElement(), () => {
      return pwdInput.getValue()
    })
    this.form.add(FomrItemsName.Password, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderHcaptcha(_container: HTMLElement) {
    if (disableCaptchaVerify) return
    const hcaptchaContainer = document.createElement('div')
    hcaptchaContainer.id = 'hcaptcha'
    hcaptchaContainer.classList.add('h-captcha')

    hcaptcha.render(hcaptchaContainer, {
      size: 'invisible',
      sitekey: EnvVariableConfig?.[this.modal?.env].HCAPTCHA_SITE_KEY || ''
    })

    _container.appendChild(hcaptchaContainer)
  }

  private renderTips(_container: HTMLElement) {
    const tips = document.createElement('div')
    tips.classList.add(...['xa-login-tip', 'xa-flex', 'xa-justify-between'])
    tips.innerHTML = `
      <div>No account yet? <a class="xa-to-sign-up">Sign up</a></div>
      <div>
        <a class="xa-to-forgotpwd">Forgot password?</a>
      </div>
    `
    _container.appendChild(tips)
  }

  private renderLoginButton(_container: HTMLElement) {
    const loginButton = new Button({
      text: 'SIGN IN',
      disabled: true,
      onClick: (event) => {
        this.handleLogin()
      }
    })
    this.loginButton = loginButton
    this.append(_container, loginButton.getElement())
  }

  private setupListeners(): void {
    const signUpLink = this.modal.modalContainer?.querySelector('.xa-to-sign-up')
    signUpLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.Signup))

    const forgotPasswordLink = this.modal.modalContainer?.querySelector('.xa-to-forgotpwd')
    forgotPasswordLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.ForgotPassword))
  }

  private handleEmailChange(value: string): void {
    this.loginButton?.setDisabled(value.length === 0 || !this.form.findFormItem(FomrItemsName.Email)?.isValidate())
  }
  private handlePasswordChange(value: string): void {
    this.loginButton?.setDisabled(value.length === 0 || !this.form.findFormItem(FomrItemsName.Password)?.isValidate())
  }

  private async getHCaptchaResponse(): Promise<string> {
    if (disableCaptchaVerify) return ''

    try {
      const hcaptchaResponsePromise = hcaptcha.execute({ async: true }) as Promise<HCaptchaResponse>
      const { response } = await hcaptchaResponsePromise
      return response || ''
    } catch {
      return ''
    }
  }

  private async handleLogin() {
    const userName = this.emailInput?.getValue()
    const password = this.pwdInput?.getValue()
    if (!userName || !password) return

    this.loginButton?.setLoading(true)

    const hcaptchaResponseToken = await this.getHCaptchaResponse()
    if (!hcaptchaResponseToken && !disableCaptchaVerify) {
      this.loginButton?.setLoading(false)
      return
    }

    const { error, err_code } = await this.modal.store.login(userName, password, hcaptchaResponseToken)
    this.loginButton?.setLoading(false)
    if (error) {
      // 11001: 'Wrong email or password.',
      // 11004: 'Too many attempts to login.',
      // 11102: 'User already registered.',
      // 11103: 'Invalid password.',
      // 11111: 'Invalid verification code.',
      // 11112: 'Verification code expired.',
      // 11113: 'User does not exist.',
      // 11401: 'Invalid or expired signature.',
      // 11003: 'User is not confirmed',
      // unknown: 'Unknown error, please try again later.'
      switch (err_code) {
        case 11001:
          this.form.findFormItem(FomrItemsName.Email)?.setError('Wrong email or password')
          break
        case 11103:
          this.form.findFormItem(FomrItemsName.Password)?.setError('Invalid password')
          break
        case 11113:
          this.form.findFormItem(FomrItemsName.Password)?.setError('User does not exist.')
          break
        case 11004:
          this.form.findFormItem(FomrItemsName.Password)?.setError('Too many attempts to login')
          break
        case 11003:
          //已注册但是未进行邮箱验证需要先验证
          XterioAuthService.sendSignUpCodeService(userName)
          this.modal.switchModalState(EAuthState.SignupCode, { email: userName, password, alreadySendCode: true })
          break
        default:
          this.form.findFormItem(FomrItemsName.Password)?.setError('Unknown error, please try again later')
          break
      }
      return
    }

    this.modal.close()
  }

  private append(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
  }
}
