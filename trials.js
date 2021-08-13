//const HDWalletProvider = require('@truffle/hdwallet-provider')
//const fs = require('fs');
const Web3 = require("web3")
const abiDecoder = require('abi-decoder')
//var ethers = require("ethers");
//const key = 'c22ccc00c4c4f8c3f04be23b3700c6d03fc875ecc9f75db52b2cf5e9199f1d3c'
const Cerebro =  require('./build/contracts/Cerebro.json')
//
//const mnemonic = fs.readFileSync(".secret").toString().trim()
const url = "https://kovan.infura.io/v3/0976d94a7cfb48bfacb9c001c1a0b9a9"
//
////wss://mainnet.infura.io/ws/v3/0976d94a7cfb48bfacb9c001c1a0b9a9
const address = '0x2189cF9d06e8EC380c01e66f3B46E8f0ecBBC720'
const abi = "0x5b4b73a90000000000000000000000000000000000000000000000000000000000000004"

//var customWsProvider = new ethers.providers.WebSocketProvider(url);
//const contract = new ethers.Contract(address, abi, customWsProvider);


//const contract = new ethers.Contract(address, abi, customWsProvider)
const caller = async () => {
    //const provider = new HDWalletProvider(mnemonic, url, 2)
    const web3 = new Web3(url)
    //const netId = await web3.eth.net.getId()
    //const cerebro = new web3.eth.Contract(Cerebro.abi, address)
    //console.log(cerebro._address)
    //console.log(`Old value ${await cerebro.methods.data().call()}`)
    //const receipt = await cerebro.methods.setData(1).send({from: '0xAc1cC3E2be6a0267a4feb54190bFC2c06D4AE3dd'})
    //console.log(`New value ${await cerebro.methods.data().call()}`)
    //const testABI = [{"inputs": [{"type": "address", "name": ""}], "constant": true, "name": "isInstantiation", "payable": false, "outputs": [{"type": "bool", "name": ""}], "type": "function"}, {"inputs": [{"type": "address[]", "name": "_owners"}, {"type": "uint256", "name": "_required"}, {"type": "uint256", "name": "_dailyLimit"}], "constant": false, "name": "create", "payable": false, "outputs": [{"type": "address", "name": "wallet"}], "type": "function"}, {"inputs": [{"type": "address", "name": ""}, {"type": "uint256", "name": ""}], "constant": true, "name": "instantiations", "payable": false, "outputs": [{"type": "address", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "creator"}], "constant": true, "name": "getInstantiationCount", "payable": false, "outputs": [{"type": "uint256", "name": ""}], "type": "function"}, {"inputs": [{"indexed": false, "type": "address", "name": "sender"}, {"indexed": false, "type": "address", "name": "instantiation"}], "type": "event", "name": "ContractInstantiation", "anonymous": false}];
    abiDecoder.addABI(Cerebro.abi);

    const testData = "0x5b4b73a90000000000000000000000000000000000000000000000000000000000000004"
    const decodedData = abiDecoder.decodeMethod(testData);
    //const decodedData = abiDecoder.decodeMethod(abi)

    console.log(decodedData) 

    process.exit()
    
}

caller()


//console.log(wallet.address)
//console.log(cerebro.address)

