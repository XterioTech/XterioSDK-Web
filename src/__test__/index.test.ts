import { getPackageVersion } from 'utils'
import { XterioAuth, XterioAuthService } from 'index'
import { XterioAuthInfo } from 'modules/XterAuthInfo'

describe('xterioauth', () => {
  test('sdkversion:', () => {
    const version = getPackageVersion()
    console.log('sdkversion=', version)
    expect(version).toEqual('1.0.0')
  })
  test('login', async () => {
    XterioAuth.init({
      client_id: '4gsmgur6gkp8u9ps8dlco3aaaa',
      redirect_uri: 'http://localhost:3000'
    })
    const authorizeUrl = XterioAuthInfo.authorizeUrl
    console.log('authorizeUrl=', authorizeUrl)
  })
  test('userinfo', async () => {
    await XterioAuthService.login('ZWRLMWVIMWYTZTM5NY0ZYTI4LTHMYJKTZJY4MDFLYJE3ODZL')
    const userinfo = XterioAuthInfo.userInfo
    console.log('userinfo=', userinfo)
  })
})
