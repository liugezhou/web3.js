const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
let web3 = new Web3(provider)

// 十六进制的转换
// const { log } = console
// log(web3.utils.toHex('Wakaka'))
// log(web3.utils.toHex('Liugezhou'))
// log(web3.utils.toHex('Tom'))

let arr = ['0x57616b616b61', '0x4c697567657a686f75', '0x546f6d']
console.log(Array.isArray(arr))
