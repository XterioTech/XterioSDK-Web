import iconLogo from '../../../assets/images/icon-logo.svg'

export class Logo {
  getElement() {
    const logo = document.createElement('div')
    logo.classList.add('xa-modal-logo')
    logo.innerHTML = `
      <img src="${iconLogo}" alt="Xterio" class="auth-logo" />
    `
    return logo
  }
}
