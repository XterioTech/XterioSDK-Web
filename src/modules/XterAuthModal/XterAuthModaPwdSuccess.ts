import { BaseModalState } from './BaseModalState'
import { EAuthState } from './enums'
import { ModalExtraData } from './interfaces'
import { Button } from './ui'
import { XterAuthModal } from './XterAuthModal'

import iconSuccess from '../../assets/images/icon-success.svg'

function successIcon() {
  const logo = document.createElement('div')
  logo.classList.add('xa-modal-logo')
  logo.innerHTML = `
      <img src="${iconSuccess}" alt="Xterio" class="xa-icon-success" />
    `
  return logo
}

export class XterAuthModaPwdSuccess extends BaseModalState {
  constructor(modal: XterAuthModal, extraData?: ModalExtraData) {
    super(modal)
  }

  render(): void {
    if (!this.modal.modalContainer) return
    const _container = this.modal.modalContainer

    this.append(_container, successIcon())

    this.modal.setTitle('Password has been changed!', 'Your password has been changed successfully')

    this.renderConfirmButton(_container)
  }

  private renderConfirmButton(_container: HTMLElement) {
    const confirmButton = new Button({
      text: 'SIGN IN',
      onClick: (event) => {
        this.modal.switchModalState(EAuthState.Login)
      }
    })
    this.append(_container, confirmButton.getElement())
  }

  private append(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
  }
}
