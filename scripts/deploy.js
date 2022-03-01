const hre = require("hardhat");
const fs = require("fs");

const main = async () => {
  const Auction = await hre.ethers.getContractFactory("Auction");
  const auction = await Auction.deploy();
  await auction.deployed();

  console.log("Auction deployed to:", auction.address);

  fs.writeFileSync(
    "config.js",
    `
    export const contractAddress = "${auction.address}";
    export const ownerAddress = "${auction.signer.address}";
    `
  );
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
