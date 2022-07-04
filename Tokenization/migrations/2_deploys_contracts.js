var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");
var kycContract = artifacts.require("KycContract.sol");

require("dotenv").config({path : "../.env"});

module.exports = async function(deployer) {
    let adr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.Initial_Tokens_Supply);
    await deployer.deploy(kycContract);
    await deployer.deploy(MyTokenSale, 1, adr[0], MyToken.address, kycContract.address);
    let instance = await MyToken.deployed();
    await instance.transfer(MyTokenSale.address, process.env.Initial_Tokens_Supply);
}