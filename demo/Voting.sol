// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Voting {
    mapping (bytes32 => uint8) public votesReceived;    //接收到的候选人以及票数的记录
    bytes32[] public candidateList; //候选人列表集合,状态设置成public的时候，该状态就会被编译成function

    //构造函数
    constructor(bytes32[] memory candidateNames){
        candidateList = candidateNames;
    }

    function totalVotesFor(bytes32 candidate) view public returns (uint8) {
        require(validCandidate(candidate));  //判断候选人是否在选民只能够
        return votesReceived[candidate];
    }

    // 投票，选票+1
    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));  //判断候选人是否在选民只能够
        votesReceived[candidate] +=  1;
    }

    // 判断是否在选民中
    function validCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i=0; i<candidateList.length; i++){
            if(candidateList[i] == candidate){
                return true;
            }
        }
        return false;
    }
}