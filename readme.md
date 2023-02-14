## 项目背景
这个项目是用来学习 [b站web3.js的一个基础教程课](https://www.bilibili.com/video/BV16L4y147Ly/?spm_id_from=333.337.search-card.all.click) 

## 知识点

### 获取 web3 对象

```js
let Web3 = require('web3');
const {log} = console
const provider = new Web3.providers.HttpProvider(
  "http://127.0.0.1:9545"
);
const provider2 = new Web3.providers.HttpProvider(
  "http://127.0.0.1:9999"
);
let web3 = new Web3(provider);
log("No web3 instance injected, using Local web3.");
log(web3.modules);
log(web3.version);

web3.eth.getNodeInfo().then(log) // 查看web3连接的节点信息
web3.eth.net.isListening().then(log)  //返回所连接节点的网络和检讨状态格式
web3.eth.net.getId().then(log) //获取 netWork id 网络号
web3.eth.getProtocolVersion().then(log) //获取以太坊协议版本

log(web3.providers) //web3可用的Providers
log(web3.currentProvider) //web3当前正在使用的Providers
log(web3.givenProvider) //查看浏览器环境设置的 web3 provider
web3.setProvider(provider2)
log(web3.setProvider) //设置 web3使用的 provider
```

### 批处理请求
将几个请求打包在一起提交提交、串联执行(一个个按顺序执行，速度不快，可保证代码执行顺序)  
BatchRequest实现批处理    
`new web3.BatchRequest()`   
`add(request)`：将请求对象添加到批调用中        
`execute()`:执行批处理请求

### 配置
项目在启动的时候，由于没有 ETH币，于是: 
  - 下载了 Ganache 软件
  - 并且在浏览器插件中自定义网络接口为 7545
  - 账户通过 Ganache中的密钥导入的方式获得
  - remix 部署的时候采取 Injected-MetaMask、切换账户

### BigNumber大数据等处理工具

**大数据处理简介**
JS中，默认的数字精度较小，对于以太坊，推荐内部以 wei 来表示余额(大整数)，只要显示余额的时候才转为 ether 或其它单位。  
在web3js中，自动添加一个依赖库 BigNumber，精度非常高，不会丢失。  
```js
const bigNumber = require('bignumber.js')
const n = new bigNumber('1234356789765432123456786543213456')
console.log(n)
console.log(n.toString()) //打印科学计数法
console.log(n.toString(10))//以10进制数完整显示，只会保存20位浮点计数(小数点后20位)
```
**判断是否为大数**
`web3.utils.isBigNumber(n)`来判断一个数是否为大数。

**以太单位转换**
`web3.utils.fromWei(number,[unit])` :将一个数值转换为以太单位
`web3.utils.toWei(number,[unit])`:将一个单位转换为Wei,1 ether为 10的18次方 wei

**数值转换**
`web3.utils.toHex()`:数字转换为16进制，文本转换为utf-8字符串

**地址相关**
`web3.utils.isAddress(address)`:检查指定的字符串是否是有效的以太坊地址，使用了大小写会校验和。

### 查询区块信息    
**查询最新的区块号（区块高度）**      
`web3.eth.getBlockNumber().then(console.log)`     
 
**查询区块信息**    
`web3.eth.getBlock(blockHashOrBlockNumber [,returnTransactionsObjects,callback])`:返回指定区块编号或块哈希对应的块   
 blockHashOrBlockNumber 可选值：区块号、区块hash 、或者字符串【'earliest','latest','pending'】  

 **查询块中的交易信息**
 `web3.eth.getTransactionFromBlock(hasStringOrNumber,indexNumber)`    
 hasStringOrNumber同上面的blockHashOrBlockNumber  
 indexNumber：区块中交易的索引，从0开始     
 显示的内容和 getBlock 设置为true后返回的 transactions 交易信息一致     

 **查询块中的交易数量**     
 `web3.eth.getBlockTransactionCount(blockHashOrBlockNumber [,callback])`    

 ### Web3.js交易操作

 **账户相关操作**   
 `web3.eth.getAccounts()`:返回当前节点控制的账户列表    
 `web3.eth.personal.newAccount(password,[callback])`:创建一个新账户    
 `web3.eth.getCoinbase()`:获得当前接收挖矿奖励的账户地址

 **交易相关操作**   
`web3.eth.getBalance(address,[defaultBlock])`:获得指定区块中特定账户地址的余额    
`web3.eth.getGasPrice()`:根据最近几个区块，计算平均gas价格

 **交易执行相关操作**   
 `web3.eth.sendTransaction(transactionObject [,callback])`:向以太网络提交一个交易。   
transactionObject参数说明： 
- from: 发送者地址
- to: 可选参数，接收者地址，若发送的为合约，则为空  
- value: 发送的币
- gas: gas的限制
- gsaPrice: 每个gas的价格
- data: 若发送的为合约，则为当前合约的 ABI 文件，否则为说明信息
- noce: 账户的前一个交易计数，这个数必须是十六进制， web3.utils.toHex()进行转换 
[示例代码](./%E9%92%B1%E5%8C%85%E8%BD%AC%E9%92%B1%E5%8C%85.js)


`web3.eth.getTransaction()` 返回具有指定哈希值的交易对象、查看交易细节

`web3.eth.getTransactionReceipt()`:返回指定交易的收据对象，如果交易是pending，返回null 

### web3.js 合约交互

**应用程序二进制接口(ABI)**

ABI文件以JSON形式表示，在JSON文件中，不能写注释.    
ABI表现形式：functions、events  
作用：将这些ABI文件传递给web3.js(或其它sdk)，根据这些接口类型构建出js对象，js对象操作合约。 

**创建合约**

合约中可用编写的内容：函数、结构体、构造函数、状态变量、事件、枚举类型等。  
合约要部署到区块链，需要编译为 字节码文件。  
合约要想被外部应用程序访问，需要编译 ABI文件。  
[示例代码](./deploy.js)

**js在区块链上部署合约**    

```
contract.deploy({
  data:data
}).send({
  from:'', //从哪个账户发送
  gas:150000,
  gasPrice:'1000000'
},function(err,transactionHash){log(transactionHash)})
```
[示例代码](./deploy.js),这个代码是指，不是通过 remix 的 发布按钮，而是通过自己写的js脚本去发布的一个合约。

**调用合约函数**  

调用智能合约读(view,pure)函数时，一般使用call，无收费   
`myContract.methods.myMethod([param1 [,p2]]).call(options [,defaultBlock] [,callback])`   
- myMethod为合约中的方法名    
- params1 为函数的参数    
- options参数说明：
    - from:String 可选 调用交易的地址  
    - gasPrice:String 可选，交易的每个Gas的价格
    - gas：Number可选，交易的Gas限制  

调用智能合约写函数：相当于发送了交易    
`MyContract.methods.myMethod([params [,param2]]).send(options [,callback])`   
- options参数说明：
    - from:String 可选 调用交易的地址  
    - gasPrice:String 可选，交易的每个Gas的价格
    - gas：Number可选，交易的Gas限制  
- 返回的结果触发事件：  
    - transactionHash: string，发送交易且得到交易哈希值后立即触发 
    - receipt：object。以事件名称为键，以事件本身为属性值的 events
    - confirmation：number。触发时第一个参数为接收到的确认数，第二个参数为收到交易数据  
    - error：交易发生过程中出错时触发

**调用合约事件**

`MyContract.methods.emitEvent("eventName").send(options [,callback])`

**执行事件查询**  

区块链是由一个个区块组成的列表，这些块的内容基本上是交易记录。  
每个交易都有一个交易日志，事件结果存放在交易日志里。  
合约发出的事件可以使用合约地址访问  
`MyContract.getPassEvents(event [,options] [,callback])`  
- event: 'AllEvents' //获取全部事件 

### Web.js应用案例    
[详细内容](./demo/readme.md)   
**简单创建投票DApp**    
**创建合约**    
**部署合约**    
**网页交互**    
