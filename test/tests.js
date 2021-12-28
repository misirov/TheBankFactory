const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploying the BankFactory contract which creates a new Bank contract and passes 2 parameters to it's constructor ", function () {



  it("Should create the BankFactory contract", async () => {

    // ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Token here is a factory for instances of our token contract.
    const BF = await ethers.getContractFactory('BankFactory');
    const Bank = await ethers.getContractFactory('Bank');

    // deploy bank factory
    const bf = await BF.deploy();
    await bf.deployed();
  })


  it("Should create a new contract", async () => {

    // ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Token here is a factory for instances of our token contract.
    const BF = await ethers.getContractFactory('BankFactory');
    const Bank = await ethers.getContractFactory('Bank');

    // deploy bank factory
    const bf = await BF.deploy();
    await bf.deployed();

    // call function with (address owner, uint256 number) parameters
    const tx1_receipt = await bf.createBank("0x52Ac6A9a2D30dbd8308f770615B78000452B1A98", 69420);
  
  })


  it("Should instantiate the created Bank and call its functions", async () => {

    // ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Token here is a factory for instances of our token contract.
    const BF = await ethers.getContractFactory('BankFactory');
    const Bank = await ethers.getContractFactory('Bank');

    // deploy bank factory
    const bf = await BF.deploy();
    await bf.deployed();


    // call function with (address owner, uint256 number) parameters
    const tx1_receipt = await bf.createBank("0x52Ac6A9a2D30dbd8308f770615B78000452B1A98", 69420);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("TX1 Created new bank. Your receipt : \n", tx1_receipt);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("BankFactory address at: ", tx1_receipt.to);

    // The Bank contract is located at the address at index 0 
    const tx2_list_of_banks = await bf.list_of_banks(0);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("TX2-BankFactory array of banks (index 0): ", tx2_list_of_banks);


    // Attach the created Bank instance to the address it's located at. Call functions.
    const bank = await Bank.attach(tx2_list_of_banks);
    const tx3_owner = await bank.owner();
    const tx3_bank_funds = await bank.bank_funds();
    const tx3_deployer = await bank.deployer()

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("TX3-Bank owner: ", tx3_owner);
    console.log("TX3-Bank funds: ", tx3_bank_funds.toString());
    console.log("TX3-Bank deployer:", tx3_deployer);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  

  })




});
