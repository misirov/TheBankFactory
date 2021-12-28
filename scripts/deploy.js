const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const BF = await hre.ethers.getContractFactory("BankFactory");
  const bf = await BF.deploy();
  await bf.deployed();

  console.log("BankFactory deployed to:", bf.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
