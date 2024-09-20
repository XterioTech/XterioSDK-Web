import { XterioAuthService } from 'modules/AuthService'
import { BaseModalState } from './BaseModalState'
import { EAuthState } from './enums'
import { ModalExtraData } from './interfaces'
import { Button, Input } from './ui'
import { validateEmail, validatePasswordMatch } from './utils'
import { XterAuthModal } from './XterAuthModal'
import { XterAuthModalForm } from './XterAuthModalForm'
import { XterModalFormItem } from './XterAuthModalFormItem'

enum ForgotFomrItemsName {
  Email = 'email',
  Code = 'code',
  Password = 'password',
  ConfirmPassword = 'confirmPassword'
}

export class XterAuthModalForgetPwd extends BaseModalState {
  private continueButton: Button | null
  form: XterAuthModalForm

  constructor(modal: XterAuthModal, extraData?: ModalExtraData) {
    super(modal)
    this.continueButton = null

    this.form = new XterAuthModalForm()
  }

  render(): void {
    if (!this.modal.modalContainer) return
    const _container = this.modal.modalContainer

    this.modal.setTitle('Forgot password', 'Please enter your email and email verification code')

    // Email Input
    this.renderEmailInput(_container)

    // Enter Code
    this.renderCodeInput(_container)

    // Password Input
    this.renderPwdInput(_container)

    // Confirm Password Input
    this.renderConfirmPwdInput(_container)

    // Continue button
    this.renderConfirmButton(_container)

    // back to sign in
    this.renderBackTip(_container)

    this.setupListeners()
  }

  private renderEmailInput(_container: HTMLElement) {
    const emailInput = new Input({
      label: 'EMAIL',
      type: 'text',
      showClearIcon: true,
      onChange: (value) => {
        this.form.clearFormItemError(ForgotFomrItemsName.Email)
        this.handleEmailChange(value)
      },
      onBlur: (value) => {
        this.form.findFormItem(ForgotFomrItemsName.Email)?.setError(validateEmail(value))
      }
    })

    const formItem = new XterModalFormItem(ForgotFomrItemsName.Email, emailInput.getElement(), () => {
      return emailInput.getValue()
    })
    this.form.add(ForgotFomrItemsName.Email, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderCodeInput(_container: HTMLElement) {
    const codeInput = new Input({
      label: 'ENTER CODE',
      type: 'text',
      onChange: (value) => {
        this.handleEmailChange(value)
      },
      addonAfterSendButton: {
        onClick: () => {
          const email = this.form.getFormItemValue(ForgotFomrItemsName.Email)
          if (!email) {
            this.form.findFormItem(ForgotFomrItemsName.Email)?.setError('Email is required')
            return
          }
          XterioAuthService.sendForgotCodeService({ email: this.form.getFormItemValue(ForgotFomrItemsName.Email) })
        },
        onCountdownEnd: () => {}
      }
    })

    const formItem = new XterModalFormItem(ForgotFomrItemsName.Code, codeInput.getElement(), () => {
      return codeInput.getValue()
    })
    this.form.add(ForgotFomrItemsName.Code, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderPwdInput(_container: HTMLElement) {
    const pwdInput = new Input({
      label: 'NEW PASSWORD',
      type: 'password',
      showClearIcon: true,
      onChange: (value) => {
        this.handlePasswordChange(value)
      }
    })
    const formItem = new XterModalFormItem(ForgotFomrItemsName.Password, pwdInput.getElement(), () => {
      return pwdInput.getValue()
    })
    this.form.add(ForgotFomrItemsName.Password, formItem)
    this.append(_container, formItem.getElement())
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
          .findFormItem(ForgotFomrItemsName.ConfirmPassword)
          ?.setError(validatePasswordMatch(this.form.getFormItemValue(ForgotFomrItemsName.Password), value))
      }
    })

    const formItem = new XterModalFormItem(ForgotFomrItemsName.ConfirmPassword, confirmPwdInput.getElement(), () => {
      return confirmPwdInput.getValue()
    })
    this.form.add(ForgotFomrItemsName.ConfirmPassword, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderConfirmButton(_container: HTMLElement) {
    const continueButton = new Button({
      text: 'CONTINUE',
      disabled: true,
      onClick: (event) => {
        this.handleUpdatePassword()
      }
      // wrapperClassNames: ['xa-login-button']
    })
    this.continueButton = continueButton
    this.append(_container, continueButton.getElement())
  }

  private renderBackTip(_container: HTMLElement) {
    const toSignInTips = document.createElement('div')
    toSignInTips.classList.add('xa-w-full', 'xa-text-center')
    toSignInTips.innerHTML = `
      <div class="xa-login-tip">
       <span>Back to </span>
        <a class="xa-to-sign-in"> Sign in </a>
      </div>
    `
    this.append(_container, toSignInTips)
  }

  private setupListeners(): void {
    const signInLink = this.modal.modalContainer?.querySelector('.xa-to-sign-in')
    signInLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.Login))

    const forgotPasswordLink = this.modal.modalContainer?.querySelector('.xa-to-forgotpwd')
    forgotPasswordLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.ForgotPassword))
  }

  private handleEmailChange(value: string): void {
    this.continueButton?.setDisabled(value.length === 0)
  }
  private handlePasswordChange(value: string): void {
    // this.loginButton?.setDisabled(value.length === 0)
  }

  private async handleUpdatePassword() {
    const email = this.form.getFormItemValue(ForgotFomrItemsName.Email)
    const password = this.form.getFormItemValue(ForgotFomrItemsName.Password)
    const confirmPwd = this.form.getFormItemValue(ForgotFomrItemsName.ConfirmPassword)
    const code = this.form.getFormItemValue(ForgotFomrItemsName.Code)

    if (!email || !password) return
    this.continueButton?.setLoading(true)
    const { error, err_code } = await XterioAuthService.resetPassword({
      email,
      password: password,
      code
    })
    this.continueButton?.setLoading(false)
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
        case 10001:
          this.form.findFormItem(ForgotFomrItemsName.Code)?.setError('Invalid verification code')
          break
        case 11111:
          this.form.findFormItem(ForgotFomrItemsName.Code)?.setError('Invalid verification code')
          break
        case 11112:
          this.form.findFormItem(ForgotFomrItemsName.Code)?.setError('Verification code expired')
          break
        case 11113:
          this.form.findFormItem(ForgotFomrItemsName.Email)?.setError('User does not exist')
          break
        default:
          this.form
            .findFormItem(ForgotFomrItemsName.ConfirmPassword)
            ?.setError('Unknown error, please try again later.')
          break
      }
      return
    }

    this.modal.switchModalState(EAuthState.PasswordSuccess)
  }

  private append(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
  }
}
