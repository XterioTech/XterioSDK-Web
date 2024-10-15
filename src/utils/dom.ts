/**
 * 给class统一加前缀
 * example: getCssName('iframe div') => xterioauth-iframe xterioauth-div
 * @param name
 * @returns string
 */
export const getCssName = (name: string, prefix: string = 'xterioauth') => {
  const a = name.split(' ').reduce((prev, cur) => prev + `${prefix}-${cur} `, '')
  return a
}

/**
 * dom元素，添加指定 class
 * example: addClass(ele, 'iframe div')
 * @param ele 目标元素
 * @param classNames 类名，以空格隔开
 */
export const addClass = (ele: HTMLElement, classNames: string) => {
  const _names = classNames.split(' ').filter(Boolean)
  if (ele.classList) {
    _names.forEach((_c: string) => {
      ele.classList.add(_c)
    })
  } else {
    const classes = ele.className.split(' ')
    _names.forEach((_c: string) => {
      if (classes.indexOf(_c) === -1) {
        classes.push(_c)
      }
    })
    ele.className = classes.join(' ')
  }
}

/**
 * dom元素，移除指定 class
 * example: removeClass(ele, 'iframe div')
 * @param ele 目标元素
 * @param classNames 类名，以空格隔开
 */
export const removeClass = (ele: HTMLElement, classNames: string) => {
  const _names = classNames.split(' ').filter(Boolean)
  if (ele.classList) {
    _names.forEach((_c: string) => {
      ele.classList.remove(_c)
    })
  } else {
    const classes = ele.className.split(' ')
    _names.forEach((_c: string) => {
      const index = classes.indexOf(_c)
      if (index !== -1) {
        classes.splice(index, 1)
      }
    })
    ele.className = classes.join(' ')
  }
}

/**
 * 将给定参数转换成cssText形式
 * example: generateCssText('width', '200px', 'height', '200px', ...)
 * @param args any[]
 * @returns string
 */
export const generateCssText = (...args: any[]): string => {
  let _css: string = ''
  for (let i = 0; i < Math.floor(args.length / 2); i++) {
    //转换一下，对于marginTop => margin-top
    const key = args[i * 2].replace(/[A-Z]/g, (m: string) => `-${m.toLowerCase()}`)
    const val = args[i * 2 + 1]
    _css += `${key}: ${val};`
  }
  return _css
}

/**
 * dom元素，设置样式
 * example1. addCssText(ele, `position:absolute;top:16px;left:16px;`)
 * example2. addCssText(ele, 'width', '200px', ...)
 * @param ele dom元素
 * @param args 系列参数
 */
export const addCssText = (ele: HTMLElement, ...args: any[]) => {
  const isCssStr = args.length === 1 && typeof args?.[0] === 'string' && args?.[0].indexOf(':') !== -1
  if (isCssStr) {
    ele.style.cssText = ele.style.cssText + args?.[0]
  } else {
    // console.log('dddd', generateCssText(...args))
    ele.style.cssText = ele.style.cssText + generateCssText(...args)
  }
}

/**
 * 将Style对象样式转成数组形式[propertyName, propertyValue, ...]
 * example: convertStyleToArray({width: '200px', marginTop:'20px'})
 * @param sty {width: '200px', marginTop:'20px'}
 * @returns ['width', '200px', 'marginTop', '20px']
 */
export const convertStyleToArray = (sty: Partial<CSSStyleDeclaration>) => {
  const _arr = []
  for (const key in sty) {
    _arr.push(key, sty[key])
  }
  return _arr
}

/**
 * 创建一个dom元素，并返回该dom元素对象，如果可点击再补充返回移除点击事件的监听函数
 * example1: getDiv('test')
 * example2: getDiv('test', ()=> {})
 * example3: getDiv('test', undefined, 'span')
 * @param cssName 指定类名
 * @param callback 点击事件
 * @returns {dom元素,移除点击监听函数?}
 */
export const getDiv = (cssName: string, callback?: () => void, tagName: string = 'div') => {
  const div = document.createElement(tagName)
  addClass(div, getCssName(cssName))
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

//创建全局iframe弹框
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
  return { shadow, iframe, iframeDiv: div }
}
