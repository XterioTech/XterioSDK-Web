import '../styles/laoder.scss'
export class Loader {
  private loader: HTMLDivElement | null
  constructor() {
    this.loader = document.createElement('div')
  }
  getElement() {
    this.loader!.classList.add('xa-loader')
    return this.loader!
  }

  show() {
    this.loader?.classList.remove('xa-hide')
  }
  hide() {
    this.loader?.classList.add('xa-hide')
  }
}
