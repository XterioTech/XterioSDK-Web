import { defineChain } from 'viem'

export const xterioBnb = defineChain({
  id: 112358,
  name: 'xterio',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'tBNB'
  },
  rpcUrls: {
    default: { http: ['https://xterio.alt.technology'] }
  },
  blockExplorers: {
    default: {
      name: 'XterioScan',
      url: 'https://xterscan.io',
      apiUrl: 'https://xterscan.io/api'
    }
  },
  contracts: {}
  // testnet: true,
})

export const xterioEth = defineChain({
  id: 2702128,
  name: 'xterioeth',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH'
  },
  rpcUrls: {
    default: { http: ['https://xterio-eth.alt.technology'] }
  },
  blockExplorers: {
    default: {
      name: 'XterioScan',
      url: 'https://eth.xterscan.io',
      apiUrl: 'https://eth.xterscan.io/api'
    }
  },
  contracts: {}
  // testnet: true,
})

export const xterioBnbTestnet = defineChain({
  id: 1637450,
  name: 'xterio',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB'
  },
  rpcUrls: {
    default: { http: ['https://xterio-testnet.alt.technology'] }
  },
  blockExplorers: {
    default: {
      name: 'XterioScan',
      url: 'https://testnet.xterscan.io',
      apiUrl: 'https://testnet.xterscan.io/api'
    }
  },
  contracts: {},
  testnet: true
})
