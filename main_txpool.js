import IUniswapV2Router02 from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'


var ethers = require("ethers");
var url = "wss://mainnet.infura.io/ws/v3/0976d94a7cfb48bfacb9c001c1a0b9a9";
const Cerebro =  require('./build/contracts/Cerebro.json')



//const HDWalletProvider = require('@truffle/hdwallet-provider')
//const fs = require('fs');
//const Web3 = require("web3");

//const mnemonic = fs.readFileSync(".secret").toString().trim()
//const url2 = "https://kovan.infura.io/v3/0976d94a7cfb48bfacb9c001c1a0b9a9"

//
//
//const address = '0xaAE37f0B828F56b40822EA62745Da15FB0854E92'



var init = function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(url);

  let txs
  
  customWsProvider.on("pending", async (tx) => {
    transaction = await customWsProvider.getTransaction(tx)
    try {
      if(transaction.to == '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D') {

        console.log(`TRANSACTION TO UNISWAP: ${transaction.to}`)
        console.log(transaction.data)

        console.log(IUniswapV2Router02)
        process.exit()
      }  else {
         console.log(`Sending transaction to ${transaction.to} `)
        }
    }
    catch(err) {
      console.log(`Transaction error: ${err} `)
    }
  })

  customWsProvider._websocket.on("error", async () => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
  customWsProvider._websocket.on("close", async (code) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`
    );
    customWsProvider._websocket.terminate();
    setTimeout(init, 3000);
  });
};

init();