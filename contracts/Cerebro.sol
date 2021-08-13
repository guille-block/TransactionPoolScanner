pragma solidity ^0.8.1;


contract Cerebro {

    uint256 public data;

    function setData(uint256 _data) public {
        data = _data;
    }
}