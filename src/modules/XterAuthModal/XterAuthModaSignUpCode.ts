import { XterioAuthService } from 'modules/AuthService'
import { BaseModalState } from './BaseModalState'
import { EAuthState } from './enums'
import { ModalExtraData } from './interfaces'
import { Button, Input, Logo } from './ui'
import { XterAuthModal } from './XterAuthModal'
import { XterAuthModalForm } from './XterAuthModalForm'
import { XterModalFormItem } from './XterAuthModalFormItem'

enum ContinueFormItemsName {
  Code = 'code'
}

export class XterAuthModalSignUpCode extends BaseModalState {
  private signUpButton: Button | null
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

    this.modal.setTitle('Verify email', 'Verification code has been sent to', this.extraData.email)

    this.renderCodeInput(_container)

    this.renderConfirmButton(_container)

    this.renderBackTip(_container)

    this.setupListeners()
  }

  private renderCodeInput(_container: HTMLElement) {
    // Code Input
    const codelInput = new Input({
      id: 'xaCodeInput',
      label: 'ENTER CODE',
      type: 'text',
      showClearIcon: true,
      onChange: (value) => {
        this.handleCodeChange(value)
      },

      addonAfterSendButton: {
        defaultStartCountdown: this.extraData.alreadySendCode,
        onClick: () => {
          if (!this.extraData?.email) {
            this.form.findFormItem(ContinueFormItemsName.Code)?.setError('Email is required')
            return
          }
          XterioAuthService.sendSignUpCodeService(this.extraData?.email)
        },
        onCountdownEnd: () => {}
      }
    })

    const formItem = new XterModalFormItem(ContinueFormItemsName.Code, codelInput.getElement(), () => {
      return codelInput.getValue()
    })
    this.form.add(ContinueFormItemsName.Code, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderConfirmButton(_container: HTMLElement) {
    const signUpButton = new Button({
      text: 'CONTINUE',
      disabled: true,
      onClick: (event) => {
        this.handleContinueSignUp()
      }
    })
    this.signUpButton = signUpButton
    this.append(_container, signUpButton.getElement())
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

  private setupListeners(): void {
    const signInLink = this.modal.modalContainer?.querySelector('.xa-to-sign-in')
    signInLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.Login))

    const forgotPasswordLink = this.modal.modalContainer?.querySelector('.xa-to-forgotpwd')
    forgotPasswordLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.ForgotPassword))
  }

  private handleCodeChange(value: string): void {
    this.signUpButton?.setDisabled(value.length === 0)
  }

  private append(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
  }

  private async handleContinueSignUp() {
    const code = this.form.getFormItemValue(ContinueFormItemsName.Code)
    const password = this.extraData?.password
    const username = this.extraData?.email

    if (!password || !username || !code) return
    this.signUpButton?.setLoading(true)
    const { error, err_code } = await this.modal.store.confirmSignUpLogin({
      username,
      password,
      code
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
        case 11111:
          this.form.findFormItem(ContinueFormItemsName.Code)?.setError('Invalid verification code')
          break
        default:
          this.form.findFormItem(ContinueFormItemsName.Code)?.setError('Unknown error, please try again later.')
          break
      }
      return
    }

    // Success
    this.modal.close()
  }
}
