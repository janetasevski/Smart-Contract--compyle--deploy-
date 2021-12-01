const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "wallet mnemonik",
  "https://rinkeby.infura.io/v3/[api-id]"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempt to deploy ", accounts[0]);

  const response = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: ["Initial Message"],
    })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("Contract deployed to", response.options.address);
};
deploy();

