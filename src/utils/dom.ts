export const getCssName = (name: string) => {
  const a = name.split(' ').reduce((prev, cur) => prev + `xterioauth-${cur} `, '')
  return a
}

const getDiv = (cssName: string, callback?: () => void) => {
  const div = document.createElement('div')
  div.className = getCssName(cssName)
  if (callback) {
    const clickHandler = (e: Event) => {
      callback?.()
    }
    div.addEventListener('click', clickHandler)
    return {
      element: div,
      remove: () => {
        div.removeEventListener('click', clickHandler)
      }
    }
  }
  return { element: div }
}

export const getIframe = (url: string) => {
  const { element: shadow } = getDiv('modal-shadow')
  const { element: bg, remove } = getDiv('modal-bg pointer', () => {
    remove?.()
    shadow.remove()
  })
  const { element: div } = getDiv('modal-container-iframe')
  shadow.appendChild(bg)
  shadow.appendChild(div)

  const iframe = document.createElement('iframe')
  iframe.width = '100%'
  iframe.height = '100%'
  iframe.frameBorder = '0'
  iframe.src = url
  div.appendChild(iframe)
  return shadow
}
