var ethers = require("ethers");
var url = "wss://kovan.infura.io/ws/v3/0976d94a7cfb48bfacb9c001c1a0b9a9";
const Cerebro =  require('./build/contracts/Cerebro.json')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const fs = require('fs');
const Web3 = require("web3");
const abiDecoder = require('abi-decoder')

const {abi} = require('./uni_abi.js')

const mnemonic = fs.readFileSync(".secret").toString().trim()
//const url2 = "https://kovan.infura.io/v3/0976d94a7cfb48bfacb9c001c1a0b9a9"

//
const url2 = "wss://mainnet.infura.io/ws/v3/0976d94a7cfb48bfacb9c001c1a0b9a9"
//const address = '0xaAE37f0B828F56b40822EA62745Da15FB0854E92'



var searcher = function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(url2);

  let txs
  
  customWsProvider.on("pending", async (tx) => {
    transaction = await customWsProvider.getTransaction(tx)
    try {
      if(transaction.to == '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D') {

        console.log(`TRANSACTION TO UNISWAP: ${transaction.to}`)

        console.log(transaction.data)

        let transactionData = parseTx(transaction.data)

        console.log(transactionData[0])
        //console.log(transactionData[1])

        if(transactionData[0] == 'swapExactETHForTokens') {
          console.log(transaction.hash)
          console.log(parseInt(transaction.gasPrice))

          process.exit()
        }



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



//let abiData = init();

abiDecoder.addABI(abi);

searcher()