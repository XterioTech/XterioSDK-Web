import { Loader } from './Loader'

export interface ButtonProps {
  text: string
  id?: string // selector id
  loading?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
  wrapperClassNames?: string[]
}

export class Button {
  private props: ButtonProps
  private root: HTMLButtonElement
  private loader: Loader | undefined

  constructor(props: ButtonProps) {
    this.props = props
    this.root = this.createButtonElement()
    // this.setUpEventListeners()
  }

  private createButtonElement(): HTMLButtonElement {
    const { id, text, wrapperClassNames, disabled, onClick } = this.props
    const button = document.createElement('button')
    button.className = 'xa-login-button'
    button.textContent = text

    const loader = new Loader()
    loader.hide()
    button.insertBefore(loader.getElement(), button.firstChild)
    this.loader = loader

    if (wrapperClassNames) {
      wrapperClassNames.forEach((className) => button.classList.add(className))
    }

    if (disabled) {
      button.disabled = true
      button.classList.add('xa-login-button_disabled')
    }

    // 绑定点击事件
    if (onClick) {
      button.addEventListener('click', (event) => onClick!(event))
    }

    return button
  }

  public getElement(): HTMLElement {
    return this.root
  }

  public setDisabled(isDisabled: boolean) {
    this.root.disabled = isDisabled
    if (isDisabled) {
      this.root.classList.add('xa-login-button_disabled')
    } else {
      this.root.classList.remove('xa-login-button_disabled')
    }
  }

  public setLoading(isLoading: boolean) {
    if (isLoading) {
      this.loader?.show()
    } else {
      this.loader?.hide()
    }
  }
}
