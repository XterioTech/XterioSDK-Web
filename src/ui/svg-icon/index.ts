const iconContentMap = {
  'icon-close': `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.414 12l6-6L18 4.586l-6 6-6-6L4.586 6l6 6-6 6L6 19.414l6-6 6 6L19.414 18l-6-6z" fill="currentColor"></path></svg>`,
  'icon-show': `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="color: rgb(254, 254, 254);"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C4 4 2 12 2 12s2 8 10 8 10-8 10-8-2-8-10-8zm-7.716 7.52c-.076.18-.137.342-.187.48A10.894 10.894 0 005.6 14.8C6.827 16.436 8.786 18 12 18c3.214 0 5.173-1.564 6.4-3.2a10.89 10.89 0 001.503-2.8A10.89 10.89 0 0018.4 9.2C17.173 7.564 15.214 6 12 6 8.786 6 6.827 7.564 5.6 9.2c-.626.834-1.05 1.68-1.316 2.32zM14 12a2 2 0 11-4 0 2 2 0 014 0zm2 0a4 4 0 11-8 0 4 4 0 018 0z" fill="currentColor"></path></svg>`,
  'icon-hide': `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="color: rgb(254, 254, 254);"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C4 4 2 12 2 12s1.028 4.113 4.56 6.44L5 20l1.414 1.414 2.023-2.023c1.03.38 2.21.609 3.563.609 8 0 10-8 10-8s-.516-2.066-2.074-4.098l1.488-1.488L20 5l-1.43 1.43C17.052 5.073 14.927 4 12 4zm5.153 3.847C15.948 6.797 14.293 6 12 6 8.786 6 6.827 7.564 5.6 9.2A10.894 10.894 0 004.097 12 10.894 10.894 0 005.6 14.8c.605.807 1.388 1.596 2.411 2.189l9.142-9.142zm-7.11 9.939A8.673 8.673 0 0012 18c3.214 0 5.173-1.564 6.4-3.2a10.89 10.89 0 001.503-2.8 10.946 10.946 0 00-1.406-2.668l-2.5 2.5L16 12a4 4 0 01-4.168 3.996l-1.79 1.79zM12 10c.064 0 .128.003.191.009l1.591-1.591a4 4 0 00-5.364 5.364l1.591-1.591A2 2 0 0112 10z" fill="currentColor"></path></svg>`
}

const getCssText = (...args: any[]): string => {
  let _css: string = ''
  for (let i = 0; i < Math.floor(args.length / 2); i++) {
    const key = args[i * 2]
    const val = args[i * 2 + 1]
    _css += `${key}: ${val};`
  }
  return _css
}

export const generateSVGIcon = (
  iconName: keyof typeof iconContentMap,
  size: string | number = 16,
  color?: string
): HTMLDivElement => {
  const iconContainer = document.createElement('div')
  iconContainer.style.cssText = `width: ${size}px; height:${size}px; display:inline-block; color: ${color ?? '#ccc'};`
  iconContainer.innerHTML = iconContentMap?.[iconName]

  return iconContainer
}
