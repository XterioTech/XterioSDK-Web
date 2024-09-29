import { BaseModalState } from './BaseModalState'
import { PrivacyURL, TermsURL } from './constant'
import { EAuthState } from './enums'
import { ModalExtraData } from './interfaces'
import { Button, Input, Logo } from './ui'
import { Checkbox } from './ui/Checkbox'
import { XterModalFormItem } from './XterAuthModalFormItem'
import { XterAuthModal } from './XterAuthModal'
import { XterAuthModalForm } from './XterAuthModalForm'
import { validateEmail, validatePassword, validatePasswordMatch } from './utils'
import { XterioAuthService } from 'modules/AuthService'
import { disableCaptchaVerify } from './utils/config'
import { EnvVariableConfig } from 'utils'

enum FomrItemsName {
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  Terms = 'terms',
  Subscribe = 'subscribe'
}
export class XterAuthModalSignUp extends BaseModalState {
  private signUpButton: Button | null
  private emailInput!: Input
  private pwdInput!: Input
  private confirmPwdInput!: Input
  private extraData: ModalExtraData
  form: XterAuthModalForm
  constructor(modal: XterAuthModal, extraData?: ModalExtraData) {
    super(modal)
    this.signUpButton = null
    this.extraData = extraData || {}

    this.form = new XterAuthModalForm()
  }

  render(): void {
    if (!this.modal.modalContainer) return
    const _container = this.modal.modalContainer

    this.modal.setTitle('Create Xterio account', 'Sign up with email')

    // Email Input
    this.renderEmailInput(_container)

    // Password Input
    this.renderPwdInput(_container)

    // Confirm Password Input
    this.renderConfirmPwdInput(_container)

    // hCaptcha
    this.renderHCaptcha(_container)

    // tips
    this.renderTipsCheckList(_container)

    // Sing Up button
    this.renderConfirmButton(_container)

    // back to sign in
    this.renderBackTip(_container)

    this.setupListeners()
  }

  private renderBackTip(_container: HTMLElement) {
    const toSignInTips = document.createElement('div')
    toSignInTips.classList.add('xa-w-full', 'xa-text-center')
    toSignInTips.innerHTML = `
      <div class="xa-login-tip">
        <span>Already have an account? </span>
        <a class="xa-to-sign-in"> Sign in </a>
      </div>
    `
    this.append(_container, toSignInTips)
  }

  private renderConfirmButton(_container: HTMLElement) {
    const signUpButton = new Button({
      text: 'SIGN UP',
      disabled: true,
      onClick: (event) => {
        this.handleSignUp()
      }
      // wrapperClassNames: ['xa-login-button']
    })
    this.signUpButton = signUpButton
    this.append(_container, signUpButton.getElement())
  }

  private renderTipsCheckList(_container: HTMLElement) {
    const tips = document.createElement('div')
    const tipItemTerms = document.createElement('div')
    tipItemTerms.classList.add('xa-login-tip', 'xa-flex')
    tipItemTerms.innerHTML = `
      <div>
        <span>I am 18 years of age or older and agree to the terms of the</span>
        <a href="${TermsURL}" target="_blank"> Terms of Service </a>
        <span>and the</span>
        <a href="${PrivacyURL}" target="_blank"> Privacy Policy </a>
      </div>
        `
    const checkbox = new Checkbox({
      defaultChecked: true,
      onChange: (checked) => {
        this.form.clearFormItemError(FomrItemsName.Terms)
      }
    })
    const checkBoxNode = checkbox.getElement()
    checkBoxNode.classList.add('xa-login-tip-checkbox')
    tipItemTerms.insertBefore(checkBoxNode, tipItemTerms.firstChild)
    tips.appendChild(tipItemTerms)
    const formItem = new XterModalFormItem(FomrItemsName.Terms, tipItemTerms, () => {
      return checkbox.checked
    })
    this.form.add(FomrItemsName.Terms, formItem)
    tips.appendChild(formItem.getElement())

    const tipSubscribe = document.createElement('div')
    tipSubscribe.classList.add('xa-login-tip', 'xa-flex', 'xa-items-center')
    tipSubscribe.innerHTML = `<div class="xa-login-tip">
        <span>Subscribe to updates via email</span>
      </div>`
    const checkbox2 = new Checkbox({ defaultChecked: false })
    const checkBoxNode2 = checkbox2.getElement()
    checkBoxNode2.classList.add('xa-login-tip-checkbox')
    tipSubscribe.insertBefore(checkBoxNode2, tipSubscribe.firstChild)
    tips.appendChild(tipSubscribe)
    const formItem2 = new XterModalFormItem(FomrItemsName.Subscribe, tipSubscribe, () => {
      return checkbox2.checked
    })
    this.form.add(FomrItemsName.Subscribe, formItem2)
    tips.appendChild(formItem2.getElement())

    this.append(_container, tips)
  }

  private renderConfirmPwdInput(_container: HTMLElement) {
    const confirmPwdInput = new Input({
      label: 'CONFRIM PASSWORD',
      type: 'password',
      showClearIcon: true,
      onChange: (value) => {
        this.handlePasswordChange(value)
      },
      onBlur: (value) => {
        this.form
          .findFormItem(FomrItemsName.ConfirmPassword)
          ?.setError(validatePasswordMatch(this.form.getFormItemValue(FomrItemsName.Password), value))
      }
    })

    this.confirmPwdInput = confirmPwdInput
    const formItem = new XterModalFormItem(FomrItemsName.ConfirmPassword, confirmPwdInput.getElement(), () => {
      return this.confirmPwdInput.getValue()
    })
    this.form.add(FomrItemsName.ConfirmPassword, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderHCaptcha(_container: HTMLElement) {
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
      }
    })
    this.pwdInput = pwdInput
    const formItem = new XterModalFormItem(FomrItemsName.Password, pwdInput.getElement(), () => {
      return this.pwdInput.getValue()
    })
    this.form.add(FomrItemsName.Password, formItem)
    this.append(_container, formItem.getElement())
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
      }
    })
    this.emailInput = emailInput
    const formItem = new XterModalFormItem(FomrItemsName.Email, emailInput.getElement(), () => {
      return this.emailInput.getValue()
    })
    this.form.add(FomrItemsName.Email, formItem)
    this.append(_container, formItem.getElement())
  }

  private setupListeners(): void {
    const signInLink = this.modal.modalContainer?.querySelector('.xa-to-sign-in')
    signInLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.Login))

    const forgotPasswordLink = this.modal.modalContainer?.querySelector('.xa-to-forgotpwd')
    forgotPasswordLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.ForgotPassword))
  }

  private handleEmailChange(value: string): void {
    this.signUpButton?.setDisabled(value.length === 0)
  }
  private handlePasswordChange(value: string): void {
    // this.loginButton?.setDisabled(value.length === 0)
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

  private async handleSignUp() {
    const userName = this.form.getFormItemValue(FomrItemsName.Email)
    const password = this.form.getFormItemValue(FomrItemsName.Password)
    const confirmPwd = this.form.getFormItemValue(FomrItemsName.ConfirmPassword)
    const termsChecked = !!this.form.getFormItemChecked(FomrItemsName.Terms)
    const subscribeChecked = !!this.form.getFormItemChecked(FomrItemsName.Subscribe)

    if (!termsChecked) {
      this.form
        .findFormItem(FomrItemsName.Terms)
        ?.setError('You have to accept Terms of Service and Privacy Policy to continue.')
      return
    }

    if (!userName || !password) return

    this.signUpButton?.setLoading(true)

    const hcaptchaResponseToken = await this.getHCaptchaResponse()
    if (!hcaptchaResponseToken && !disableCaptchaVerify) {
      this.signUpButton?.setLoading(false)
      return
    }

    const { error, err_code } = await XterioAuthService.registerService({
      username: userName,
      password: password,
      subscribe: subscribeChecked,
      hcaptchaResponseToken
    })
    this.signUpButton?.setLoading(false)
    if (error) {
      // 11001: 'Wrong email or password.',
      // 11004: 'Too many attempts to login.',
      // 11102: 'User already registered.',
      // 11103: 'Invalid password.',
      // 11111: 'Invalid verification code.',
      // 11112: 'Verification code expired.',
      // 11113: 'User does not exist.',
      // 11401: 'Invalid or expired signature.',
      // unknown: 'Unknown error, please try again later.'
      switch (err_code) {
        case 11102:
          this.form.findFormItem(FomrItemsName.Email)?.setError('User already registered.')
          break
        case 11103:
          this.form.findFormItem(FomrItemsName.Password)?.setError('Invalid password.')
          break
        default:
          this.form.findFormItem(FomrItemsName.Subscribe)?.setError('Unknown error, please try again later.')
          break
      }
      return
    }

    this.modal.switchModalState(EAuthState.SignupCode, { email: userName, password })
  }

  private append(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
  }
}
