const contractAddress = '0x207f7087ea7b1f047aa109e175e97618f75bfcc9'
const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "increment",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "reset",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const ethers = require('ethers');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

let provider = ethers.getDefaultProvider('ropsten');
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
let contract = new ethers.Contract(contractAddress, abi, provider);
let readAndWriteContract = contract.connect(wallet);


async function getCount() {
  return await contract.count();
}

async function incrementCount() {
  return await readAndWriteContract.increment();
}

async function resetCount() {
  return await readAndWriteContract.reset();
}

const server = express();
const port = 3000;
server.set('port', port);
server.use(bodyParser.json());

server.get('/getCount', async (request, response) => {
  let count = await getCount();
  //console.log(`Count is ${count.toNumber()}`);
  response.send(`Count is ${count.toNumber()}`);
});

server.post('/incrementCount', async (request, response) => {
  await incrementCount();
  //console.log(`Counter incremented`);
  response.send(`Counter incremented`);
});

server.post('/resetCount', async (request, response) => {
  await resetCount();
  //console.log(`Reset to 0`);
  response.send(`Reset to 0`);
});

server.listen(port);
