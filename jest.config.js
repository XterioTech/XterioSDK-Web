/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleNameMapper: {
    // '@/(.*)$': '<rootDir>/src/$1'
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^index(.*)$': '<rootDir>/src/index$1',
    '^interfaces(.*)$': '<rootDir>/src/interfaces$1',
    '^modules(.*)$': '<rootDir>/src/modules$1',
    '^provider(.*)$': '<rootDir>/src/provider$1'
  },
  transformIgnorePatterns: [
    // '/node_modules/(?!(query-string)/)' // 忽略 node_modules 下的 module1 和 module2
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
