let Web3 = require('web3')

const { log } = console
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
let web3 = new Web3(provider)

const transactionObject = {
  from: '0xee790f52EBAe25E3a041C520E4F0437a96Bd2832',
  to: '0x17343Ee4d2A2CCD615885b54985771Ed6fF822a7',
  value: web3.utils.toWei('1','ether')
  // data: '0x'
}

web3.eth.sendTransaction(transactionObject).then((err,result)=>{
  log(err)
  log(result)
})
