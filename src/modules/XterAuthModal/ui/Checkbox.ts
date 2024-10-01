import '../styles/checkbox.scss'

interface CheckboxProps {
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}
export class Checkbox {
  private root: HTMLDivElement
  private checkboxInput: HTMLInputElement
  private checkboxLabel: HTMLLabelElement
  private _checked = false
  private props: CheckboxProps

  constructor(props: CheckboxProps) {
    this._checked = !!props.defaultChecked
    this.props = props

    this.root = document.createElement('div')
    this.root.className = 'xa-checkbox-wrapper'

    this.checkboxInput = document.createElement('input')
    this.checkboxInput.type = 'checkbox'
    this.checkboxInput.className = 'xa-checkbox-input'
    this.checkboxInput.checked = this._checked

    this.checkboxLabel = document.createElement('label')
    this.checkboxLabel.className = 'xa-checkbox-label'

    this.root.appendChild(this.checkboxInput)
    this.root.appendChild(this.checkboxLabel)

    this.root.addEventListener('click', this.handleCheckboxChange.bind(this))

    this.updateCheckboxState()
  }

  getElement(): HTMLElement {
    return this.root
  }

  private handleCheckboxChange() {
    const { onChange } = this.props
    this._checked = !this._checked
    this.updateCheckboxState()
    onChange?.(this._checked)
  }
  private updateCheckboxState() {
    if (this._checked) {
      this.checkboxLabel.style.borderColor = '#0a1161'
      this.checkboxLabel.style.backgroundColor = '#0a1161'
      this.checkboxInput.checked = true
    } else {
      this.checkboxLabel.style.borderColor = '#0a1161'
      this.checkboxLabel.style.backgroundColor = 'transparent'
      this.checkboxInput.checked = false
    }
  }

  get checked(): boolean {
    return this._checked
  }
}
