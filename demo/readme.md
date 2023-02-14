### Web.js应用案例
 
**简单创建投票DApp**    
与区块进行通信的方式是通过 RPC（Remote Procedure Call)  
web3.js是一个js库，抽象出了所有的 RPC 调用，便于通过 js与区块链进行交互。  
实现一个最简单的投票DApp

**创建合约**    
写一个叫做 Voting 的合约，合约的内容  
- 初始化候选者  
- 用来投票的方法  
- 返回候选者所获得的总票数  
- [代码示例](./Voting.sol)

**部署合约**    

将以上sol文件在 remix 中编写。  
发布到 External Http Provider（选择倒数第二个账户发布）   
- 发布时，需要传入十六进制参数，通过 web3.utils.toHex转成一个三个候选人的数据后，在deploy中加入数组参数，发现 remix 不支持  
- 于是使用 web3.js发布的方式实现 [DeployUtils.js](./DeployUtils.js) - 通过步骤一发布，步骤二测试检查

**网页交互**    
前端内容写到了 drag 中去了。