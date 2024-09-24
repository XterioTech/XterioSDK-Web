import { XterModalFormItem } from './XterAuthModalFormItem'

export class XterAuthModalForm {
  private formList = [] as { name: string; formItem: XterModalFormItem }[]
  constructor() {}

  add(name: string, formItem: XterModalFormItem) {
    this.formList.push({ name, formItem })
  }

  findFormItem(name: string) {
    const find = this.formList.find((item) => item.name === name)?.formItem
    return find
  }

  clearFormItemError(name: string) {
    const find = this.formList.find((item) => item.name === name)?.formItem
    find?.clearError()
  }

  getFormItemValue(name: string): string {
    const find = this.formList.find((item) => item.name === name)?.formItem
    return find?.value?.toString() ?? ''
  }

  getFormItemChecked(name: string): boolean {
    const find = this.formList.find((item) => item.name === name)?.formItem
    return !!find?.value
  }
}
