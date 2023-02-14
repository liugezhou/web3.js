let Web3 = require('web3')
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
let web3 = new Web3(provider)
const { log } = console
// const bigNumber = require('bignumber.js')
// const n = new bigNumber('1234356789765432123456786543213456.012345678901234567891')
// const n = "12345678901234567890"
// console.log(n)
// console.log(n.toString(10))
// console.log(web3.utils.isBigNumber(n))

// log(web3.utils.fromWei('1','ether'))
// log(web3.utils.toWei('1','ether'))
// log(web3.utils.toHex('234'))
// log(web3.utils.isAddress('0xE6F5B08C07bAc786106c3aad43deFF4B3960cD4c'))
// web3.eth.getBlockNumber().then(log) //查询最新的区块号
// web3.eth.getBlock('latest',true).then(log)
// web3.eth.getBlock('earliest').then(log)

// web3.eth
//   .getBlock(
//     '0xc0789fc00b285eab71f01da2a3dcdd745a75c21f38040d134e822ab5c7d8bb03',true
//   )
//   .then(log)
// web3.eth
//   .getTransactionFromBlock(
//     '0xc0789fc00b285eab71f01da2a3dcdd745a75c21f38040d134e822ab5c7d8bb03',
//     0
//   )
//   .then(log)

// web3.eth
//   .getBlockTransactionCount(
//     '0xc0789fc00b285eab71f01da2a3dcdd745a75c21f38040d134e822ab5c7d8bb03',
//   )
//   .then(log)

// web3.eth.personal.newAccount('!@#qwe').then(log)

// web3.eth.getAccounts().then(log)

// web3.eth.isMining().then(log)
// web3.eth.getCoinbase().then(log)

// web3.eth.getBalance('0x1477F7232e2238c5875467705f1862FeA8ed520c',(err,result)=>{
//   const balance = result.toString()
//   log(balance)
//   log(web3.utils.fromWei(balance,'ether'))
// })

// web3.eth.getGasPrice().then((result)=>{
//   log('wei:',result)
//   log('ether',web3.utils.fromWei(result,'ether'))
// })

// let transactionObject = {
//   from: '0x1477F7232e2238c5875467705f1862FeA8ed520c',
//   to: '0xE8e555DdCd9687Bb31983719D396Fd19891915dB',
//   value: web3.utils.toWei('1','ether'),
// }

// web3.eth.sendTransaction(transactionObject,(err,result)=>{
//   log(err)
//   log(result)
// })

// web3.eth.getTransactionReceipt('0x4a2a452ddc440744ea49dae1973688788f82fe5597dd8e32cc5294e6bd3742ed').then((err,result)=>{
//   log(err)
//   log(result)
// })

// web3.eth.getTransaction('0x4a2a452ddc440744ea49dae1973688788f82fe5597dd8e32cc5294e6bd3742ed').then((err,result)=>{
//   log(err)
//   log(result)
// })