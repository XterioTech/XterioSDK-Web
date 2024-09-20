import { IUserInfo } from 'interfaces/loginInfo'
import { XterAuthModal } from './XterAuthModal'

export const useXterLoginModal = ({
  onLoginStateChange
}: {
  onLoginStateChange: (isLogin: boolean, userInfo: IUserInfo | null | undefined) => void
}) => {
  // modal
  const modal = XterAuthModal.instance

  // initial user info

  function open() {
    modal.open()
  }

  function logout() {
    modal.store.logout()
  }

  modal.store.subscribe(() => {
    onLoginStateChange?.(modal.store.userState.isLogin, modal.store.userState.userInfo)
  })

  return { open, logout }
}
