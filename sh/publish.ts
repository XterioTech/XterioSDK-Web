import chalk from 'chalk'
import consola from 'consola'
import { appendFileSync, readFileSync, readJSONSync, writeJSONSync } from 'fs-extra'
import { pathAuth, pathWallet, pathAuthJson, pathWalletJson, pathSh, pathRoot } from './paths'
import { run } from './run'
import * as readline from 'readline'
import { resolve } from 'path'

const AuthJsonData = readJSONSync(pathAuthJson, { encoding: 'utf-8' })
const WalletJsonData = readJSONSync(pathWalletJson, { encoding: 'utf-8' })

const _flag = process.argv[2]
const _version = process.argv[3]
consola.info('_flag=', chalk.blue(_flag), _version)

async function init() {
  const isExecuteAuth = !_flag || _flag === 'auth'
  const isExecuteWallet = !_flag || _flag === 'wallet'
  if (isExecuteAuth) {
    await publishAuth()
  }
  if (isExecuteWallet) {
    await publishWallet()
  }
}

const publishAuth = async () => {
  let authVersion = AuthJsonData.version
  if (_version) {
    authVersion = _version
    AuthJsonData.version = _version
    writeJSONSync(pathAuthJson, AuthJsonData, { encoding: 'utf-8', spaces: 2 })
  }
  await run(`pnpm run build:auth`, pathRoot)

  const result = await run('npm publish', pathAuth)
  if (result !== 0) {
    consola.error(chalk.red('auth publish failed.'))
    return
  }
  // publish success
  updateReleaseDoc(authVersion, pathAuth)
  await commitVersionFile('auth', authVersion)
  // 发release
  await run(`bash release_new.sh auth ${authVersion} "${lines}"`, pathSh)
  await sleep(5000)
  //合分支
  await run(`bash mr.sh`, pathSh)
}

const publishWallet = async () => {
  let walletVersion = WalletJsonData.version
  if (_version) {
    walletVersion = _version
    WalletJsonData.version = _version
    writeJSONSync(pathWalletJson, WalletJsonData, { encoding: 'utf-8', spaces: 2 })
  }
  await run(`pnpm run build:wallet`, pathRoot)
  changeWalletPackageJson('publish')

  const result = await run('npm publish', pathWallet)
  if (result !== 0) {
    consola.error(chalk.red('wallet publish failed.'))
    changeWalletPackageJson('reset')
    return
  }
  // publish success
  updateReleaseDoc(walletVersion, pathWallet)
  await commitVersionFile('wallet', walletVersion)
  // 发release
  await run(`bash release_new.sh wallet ${walletVersion} "${lines}"`, pathSh)
  //recover,复原
  changeWalletPackageJson('reset')
  await commitVersionFile('wallet', walletVersion, true)
  await sleep(5000)
  //合分支
  await run(`bash mr.sh`, pathSh)
}

const changeWalletPackageJson = (flag: string) => {
  const authVersion = AuthJsonData.version
  if (flag === 'publish') {
    WalletJsonData.peerDependencies['@xterio-sdk/auth'] = '^' + authVersion.split('.').slice(0, 2).join('.')
    delete WalletJsonData.dependencies['@xterio-sdk/auth']
    writeJSONSync(pathWalletJson, WalletJsonData, { encoding: 'utf-8', spaces: 2 })
  } else {
    WalletJsonData.peerDependencies['@xterio-sdk/auth'] = 'workspace:^'
    WalletJsonData.dependencies['@xterio-sdk/auth'] = 'workspace:^'
    writeJSONSync(pathWalletJson, WalletJsonData, { encoding: 'utf-8', spaces: 2 })
  }
}

const commitVersionFile = async (_f: string, _v: string, _reset?: boolean) => {
  const path = _f === 'auth' ? pathAuth : pathWallet
  const msg = _reset ? `feat: recover files after publish ${_f}(${_v})` : `feat: npm pkg(${_f}) publish(${_v})`
  await run(`git push origin npm-publish`)
  await run(`git add . && git commit -m "${msg}"`, path)
  await run(`git push origin npm-publish`)
  await run(`git tag ${_v}-${_f}`)
  await run(`git push origin --tags`)
}

const updateReleaseDoc = async (v: string, path: string) => {
  const docPath = resolve(path, 'RELEASE.md')
  const data = readFileSync(docPath, 'utf-8')
  const pattern = new RegExp(`# ${v.replace(/\./g, '\\.')}(\\s|$)`)
  if (!pattern.test(data)) {
    appendFileSync(docPath, `\n# ${v}\n`)
    appendFileSync(docPath, lines.map((i) => `- ${i} \n`).join(''))
  }
}
const sleep = (time: number) => {
  return new Promise((res) => {
    setTimeout(res, time)
  })
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const lines: string[] = []
consola.info(chalk.blue('Please enter some message for this publish.\n'))
const promptForInput = () => {
  rl.question('', (line: string) => {
    if (line === '') {
      rl.close()
      init()
    } else {
      lines.push(line)
      promptForInput()
    }
  })
}
promptForInput()
// init()
