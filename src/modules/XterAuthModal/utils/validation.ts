export const isEmail = (email: string): boolean => {
  return !!email && /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)
}

export const isRightPassword = (password?: string): boolean => {
  return !!password && /^(?=.*[A-Z])(?=.*\d)[\S]{8,}$/.test(password)
}

export function isRightCode(code: string) {
  return /^[0-9]{6}$/g.test(code)
}

export const isRightNickname = (nickname: string): boolean => {
  return /^[!-~ ]{1,20}$/.test(nickname)
}

export const validateEmail = (inputStr: string) => {
  return isEmail(inputStr) ? '' : 'Invalid Email'
}

export const validatePassword = (inputStr: string) => {
  return isRightPassword(inputStr) ? '' : 'Password must be at least 8 characters with 1 upper case letter and 1 number'
}

export const validatePasswordMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword ? '' : "The passwords don't match"
}
