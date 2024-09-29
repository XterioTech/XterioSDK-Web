export class XterModalFormItem {
  private root: HTMLDivElement
  private label: HTMLSpanElement
  private getValueFunction: () => string | boolean
  // private input: HTMLInputElement
  // private error: HTMLSpanElement
  private _value = ''
  constructor(name: string, formItemElement: HTMLElement, getValue: () => string | boolean) {
    this.root = document.createElement('div')
    this.root.className = 'xa-form-item'
    this.root.innerHTML = `
    <div class="xa-form-item-error"></div>`
    this.root.setAttribute('data-name', name)
    this.root.insertBefore(formItemElement, this.root.firstChild)

    this.label = document.createElement('span')
    this.getValueFunction = getValue
  }

  getElement(): HTMLElement {
    return this.root
  }

  get value() {
    return this.getValueFunction()
  }

  setError(error: string) {
    this.root.querySelector('.xa-form-item-error')!.innerHTML = error
    if (error) {
      this.root.querySelector('.xa-input-wrapper')?.classList.add('xa-error-border')
    } else {
      this.root.querySelector('.xa-input-wrapper')?.classList.remove('xa-error-border')
    }
  }

  isValidate(): boolean {
    return !this.root.querySelector('.xa-form-item-error')?.innerHTML
  }

  clearError() {
    this.root.querySelector('.xa-form-item-error')!.innerHTML = ''
    this.root.querySelector('.xa-input-wrapper')?.classList.remove('xa-error-border')
  }
}
