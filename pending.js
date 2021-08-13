var ethers = require("ethers");
//const Cerebro =  require('./build/contracts/Cerebro.json')
const HDWalletProvider = require('@truffle/hdwallet-provider')
//const fs = require('fs');
//const Web3 = require("web3");
const abiDecoder = require('abi-decoder')
require('dotenv').config()

const {abi} = require('./uni_abi.js')

//If you want to send a transaction you need the mnemonic. This can be set up on a .secret file
//const mnemonic = fs.readFileSync(".secret").toString().trim()

const url = process.env.INFURA_ENDPOINT



var searcher = function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(url);

  customWsProvider.on("pending", async (tx) => {
    transaction = await customWsProvider.getTransaction(tx)
    try {
      if(transaction.to == '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D') {

        console.log(`TRANSACTION TO UNISWAP: ${transaction.to}`)

        console.log(transaction.data)

        let transactionData = parseTx(transaction.data)

        console.log(transactionData[0])

        if(transactionData[0] == 'swapExactETHForTokens') {
          console.log(transaction.hash)
          console.log(parseInt(transaction.gasPrice))

          process.exit()
        }

       //If you want to send a transaction on 

        //const provider = new HDWalletProvider(mnemonic, url2, 2)
        //const web3 = new Web3(provider)
        //const netId = await web3.eth.net.getId()
        //const cerebro = new web3.eth.Contract(Cerebro.abi, Cerebro.networks[netId].address)
        //console.log(cerebro._address)
        //console.log(`Old value ${await cerebro.methods.data().call()}`)
        //await cerebro.methods.setData(4).send({from: '0xAc1cC3E2be6a0267a4feb54190bFC2c06D4AE3dd'})
        //.on('transactionHash', function(hash){
        //  txs = hash
        //})
        //console.log(`New value ${await cerebro.methods.data().call()}`)

        
      //} else if(transaction.hash == txs) {
        //console.log(`My contract transaction: ${txs}`)
      } else {
         console.log(`transaction to ${transaction.to} `)
         //console.log(transaction.data)
        }
    }
    catch(err) {
      console.log(`Transaction error: ${err} `)
    }
  })

  customWsProvider._websocket.on("error", async () => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(searcher, 3000);
  });
  customWsProvider._websocket.on("close", async (code) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`
    );
    customWsProvider._websocket.terminate();
    setTimeout(searcher, 3000);
  });
};


function parseTx(input) {
  if (input == '0x')
      return ['0x', []]
  let decodedData = abiDecoder.decodeMethod(input);
  let method = decodedData['name'];
  let params = decodedData['params'];

  return [method, params]
}


abiDecoder.addABI(abi);

searcher()