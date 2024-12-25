export function isSafariOrIphone() {
  const userAgent = navigator.userAgent
  const isIphone = /iPad|iPhone|iPod/i.test(userAgent)
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent)
  return isIphone || isSafari
}
