/*
 * @Author: liugezhou
 * @Date: 2023-02-14 15:00:10
 * @LastEditors: liugezhou
 * @LastEditTime: 2023-02-14 19:22:50
 * @FilePath: /web3/web3.js
 * @Description: 关联区块链上已经部署了智能合约
 */
const Web3 = require('web3')
const {ABI} = require('./abi.abi')
const { log } = console

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
let web3 = new Web3(provider)
// log(web3.version)
const address = '0x7cC19Cd8F75591F7d2280918787DB7Fe66867C7C' //合约地址，点击deploy后生成
let contract = new web3.eth.Contract(ABI, address) //创建合约对象
function callback(err,result) {
  log('callback get ETH balance:', result)
}
function callback2(err,result) {
  log('callback2 get the number is:', result)
}

let batch = new web3.BatchRequest();//创建批量请求对象
batch.add(web3.eth.getBalance.request('0x17343Ee4d2A2CCD615885b54985771Ed6fF822a7', 'latest', callback)) //制定的钱包地址信息
batch.add(contract.methods.getNumber().call.request({ from: '0x17343Ee4d2A2CCD615885b54985771Ed6fF822a7' }, callback2)) //合约的number值
batch.execute()
