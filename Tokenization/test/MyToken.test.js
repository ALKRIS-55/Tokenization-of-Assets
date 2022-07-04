const Token = artifacts.require("MyToken.sol");

const chai = require("./Chai_ext.js");
const BN = web3.utils.BN;
const expect = chai.expect;
require("dotenv").config({path : "../.env"});

contract("Token Test", async(accounts) => {
    
    const [deployerAccount, recepient, anotherAccount] = accounts;

    beforeEach(async() => {
        this.myToken = await Token.new(process.env.Initial_Tokens_Supply);
    })

    it("All token should be in my account", async() =>{
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("Is possible to send tokens between accounts", async() => {
        const sendTokens = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recepient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recepient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("Cann't send more token than deployer account", async () => {
        let instance = this.myToken;
        let balanceofDeployerAccount = await instance.balanceOf(deployerAccount);
        expect(instance.transfer(recepient, new BN(balanceofDeployerAccount+1))).to.be.eventually.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.bignumber.equal(balanceofDeployerAccount);    
    });
});