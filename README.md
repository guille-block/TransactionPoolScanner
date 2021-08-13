# Transaction Pool Scanner

### Objective:

The purpose of this project is to access the pool of pending transactions to search the ones calling the UniSwap Router. After a transaction of this type is found, we decod
then called method and analyze the parameters.

### How to use it:

There are many files to try different things, but the main one we should focus on is the pending.js file.
First, you need to set up your Infura endpoint url (pay attention the connection was established via websocket).
Second run: 

```{js}
npm install
```

Here we will install all the dependencies we have on our project.

Finally, we are ready to start searching the transaction pool. With the command:

```{js}
node pending
```

we can start our script execution. After the first call to the Uniswap Router is made, if the called method is 'swapExactETHForTokens' the process will exit leaving you with the decoded information of the last transaction.

Observations:

This is the starting point of a useful tool as you could provide a mnemonic phrase to sign a transaction in any specific moment. 

