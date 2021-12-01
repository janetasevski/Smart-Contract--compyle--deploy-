const assert = require("assert");
const Web3 = require("web3");
let web3 = new Web3("http://127.0.0.1:7545");
const { abi, bytecode } = require("../compile");

let inbox;
let account;

beforeEach(async () => {
  // Get a list of all accounts
  const listAccounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  account = listAccounts[0];
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: ["Initial Message"],
    })
    .send({ from: account, gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", async () => {
    assert.ok(inbox.options.address);
  });

  it("have default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Initial Message");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("New Message").send({ from: account });
    const message = await inbox.methods.message().call();
    assert.equal(message, "New Message");
  });
});
