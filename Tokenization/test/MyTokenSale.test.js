const Token = artifacts.require("MyToken.sol");
const myToken = artifacts.require("MyTokenSale.sol");
var kycContract = artifacts.require("KycContract.sol");

const chai = require("./Chai_ext.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path : "../.env"});

contract("Token Sale Test", async(accounts) => {
    
    const [deployerAccount, recepient, anotherAccount] = accounts;

    it("Does not have any token in my deployer account", async() => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("Should have all the tokens in token sale account", async () => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("Should be transferrable", async () => {
        let Tokeninstance = await Token.deployed();
        let TokenSaleinstance = await myToken.deployed();
        let kycinstance = await kycContract.deployed();
        let balancebefore = await Tokeninstance.balanceOf(deployerAccount);
        expect(TokenSaleinstance.sendTransaction({from : deployerAccount, value : web3.utils.toWei("1", "wei")})).to.be.rejected;
        expect(Tokeninstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balancebefore);
        await kycinstance.setKycCompleted(deployerAccount);
        expect(TokenSaleinstance.sendTransaction({from : deployerAccount, value : web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(Tokeninstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balancebefore.add(new BN(1)));
    });
});

