const hre = require("hardhat");

async function main() {

  const Payments = await hre.ethers.getContractFactory("Payments");
  const payments = await Payments.deploy();

  await payments.deployed();

  console.log(
    `contract deployed to ${payments.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
