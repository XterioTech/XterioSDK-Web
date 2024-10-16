import { generateSVGIcon } from 'ui/svg-icon'

export interface InputProps {
  type: 'text' | 'password'
  id?: string // selector id
  label: string
  placeholder?: string
  errorMessage?: string
  showError?: boolean
  showClearIcon?: boolean
  showPasswordToggleIcon?: boolean
  wrapperClassNames?: string[]
  addonAfterButton?: {
    text: string
    onClick: () => void
  }
  addonAfterSendButton?: {
    onClick: () => void
    onCountdownEnd: () => void
    defaultStartCountdown?: boolean
  }
  onChange?: (value: string) => void
  onFocus?: (value: string) => void
  onBlur?: (value: string) => void
}

export class Input {
  private props: InputProps
  private root: HTMLElement
  private inputElement!: HTMLInputElement | null
  clearIcon: HTMLDivElement | null = null

  constructor(props: InputProps) {
    this.props = props
    this.inputElement = null
    this.root = this.createInputElement()
    this.setUpEventListeners()
  }

  private createInputElement(): HTMLElement {
    const { id, type, label, wrapperClassNames, showClearIcon, showPasswordToggleIcon, onChange, onBlur, onFocus } =
      this.props
    const containerDiv = document.createElement('div')
    containerDiv.classList.add('xa-input-wrapper', `xa-input-wrapper-${type}`)

    if (wrapperClassNames) {
      wrapperClassNames.forEach((className) => containerDiv.classList.add(className))
    }

    const labelElement = document.createElement('span')
    labelElement.className = 'xa-input-label'
    labelElement.textContent = label
    containerDiv.appendChild(labelElement)

    const inputInnerDiv = document.createElement('div')
    inputInnerDiv.className = 'xa-input-inner'

    const inputElement = document.createElement('input')
    inputElement.type = type === 'password' ? 'password' : type
    inputElement.id = 'auth-input'
    inputElement.className = 'xa-input'
    inputElement.placeholder = ''
    this.inputElement = inputElement
    inputInnerDiv.appendChild(inputElement)

    if (showClearIcon) {
      const clearIcon = document.createElement('div')
      clearIcon.className = 'xa-input-clear'
      clearIcon.appendChild(generateSVGIcon('icon-close'))
      clearIcon.style.visibility = 'hidden'
      clearIcon.addEventListener('click', () => {
        inputElement.value = ''
        clearIcon.style.visibility = 'hidden'
      })
      this.clearIcon = clearIcon
      inputInnerDiv.appendChild(clearIcon)
    }

    if (type === 'password' && showPasswordToggleIcon) {
      const toggleIcon = document.createElement('div')
      toggleIcon.className = 'xa-input-value-hide'
      toggleIcon.addEventListener('click', () => {
        if (inputElement.type === 'password') {
          inputElement.type = 'text'
          toggleIcon.className = 'xa-input-value-show'
        } else {
          inputElement.type = 'password'
          toggleIcon.className = 'xa-input-value-hide'
        }
      })

      inputInnerDiv.appendChild(toggleIcon)
    }

    if (this.props.addonAfterSendButton) {
      const { onClick, onCountdownEnd } = this.props.addonAfterSendButton
      const addBtn = document.createElement('button')
      let countdown = 60
      function sendCountdown() {
        const timer = setInterval(() => {
          countdown--
          if (countdown === 0) {
            addBtn.disabled = false
            addBtn.textContent = 'SEND'
            clearInterval(timer)
            countdown = 60
            onCountdownEnd?.()
          } else if (countdown > 0) {
            addBtn.disabled = true
            addBtn.textContent = `${countdown - 1}s`
          }
        }, 1000)
      }

      if (this.props.addonAfterSendButton.defaultStartCountdown) {
        sendCountdown()
      }
      addBtn.className = 'xa-input-addon-btn'
      addBtn.textContent = 'SEND'
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        e.preventDefault()
        addBtn.disabled = true
        sendCountdown()
        addBtn.textContent = `${countdown}s`
        onClick?.()
      })
      inputInnerDiv.appendChild(addBtn)
    }

    // if (this.props.addonAfterButton) {
    //   const { text, onClick } = this.props.addonAfterButton
    //   const addBtn = document.createElement('button')
    //   addBtn.className = 'xa-input-addon-btn'
    //   addBtn.textContent = text
    //   addBtn.addEventListener('click', (e) => {
    //     e.stopPropagation()
    //     e.preventDefault()
    //     onClick?.()
    //   })
    //   inputInnerDiv.appendChild(addBtn)
    // }

    // Event callback
    inputElement.addEventListener('input', (event) => {
      const _val = (event.target as HTMLInputElement)?.value ?? ''
      if (this.clearIcon) {
        this.clearIcon.style.visibility = _val ? 'visible' : 'hidden'
      }
      if (onChange) {
        onChange(_val)
      }
    })

    inputElement.addEventListener('focus', (event) => {
      if (onFocus) {
        onFocus((event.target as HTMLInputElement)?.value ?? '')
      }
    })

    inputElement.addEventListener('blur', (event) => {
      if (onBlur) {
        onBlur((event.target as HTMLInputElement)?.value ?? '')
      }
    })

    containerDiv.appendChild(inputInnerDiv)

    // 错误提示信息
    const errorTipElement = document.createElement('p')
    errorTipElement.className = 'xa-error-tip'
    if (this.props.showError) {
      errorTipElement.textContent = this.props.errorMessage || ''
    } else {
      errorTipElement.style.display = 'none'
    }
    containerDiv.appendChild(errorTipElement)

    return containerDiv
  }

  public getElement(): HTMLElement {
    return this.root
  }

  private setUpEventListeners() {
    const wrappers = this.root

    this.root.addEventListener('click', () => {
      const input = this.root.querySelector<HTMLInputElement>('.xa-input')

      if (input) {
        input.focus()
      }
    })

    const inputs = this.root.querySelectorAll<HTMLInputElement>('.xa-input')
    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        const wrapper = input.closest('.xa-input-wrapper')
        const label = wrapper?.querySelector('.xa-input-label')
        if (label) {
          label.classList.add('xa-input-label_filled')
        }
      })

      input.addEventListener('blur', () => {
        const wrapper = input.closest('.xa-input-wrapper')
        const label = wrapper?.querySelector('.xa-input-label')
        if (label && input.value === '') {
          label.classList.remove('xa-input-label_filled')
        }
      })
    })
  }

  public showError(message: string) {
    const errorTip = this.root.querySelector('.xa-error-tip') as HTMLElement
    errorTip.textContent = message
    errorTip.style.display = 'block'
  }

  public hideError() {
    const errorTip = this.root.querySelector('.xa-error-tip') as HTMLElement
    errorTip.style.display = 'none'
  }

  // 新增方法：获取输入框的值
  public getValue(): string {
    return this.inputElement!.value
  }

  // 新增方法：设置输入框的值
  public setValue(value: string) {
    this.inputElement!.value = value
    // 如果提供了 onChange 回调，也可以在这里触发它
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }
}
