import { ModalExtraData } from './interfaces'
import { XterAuthModal } from './XterAuthModal'

export abstract class BaseModalState {
  protected modal: XterAuthModal

  constructor(modal: XterAuthModal, extraData?: ModalExtraData) {
    this.modal = modal
  }

  abstract render(): void
}
