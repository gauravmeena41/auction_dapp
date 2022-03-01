const { ethers } = require("hardhat");

describe("Auction", function () {
  it("Should set auction price and image address", async function () {
    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy();
    await auction.deployed();
    console.log("Auction deployed: ", auction.address);

    await auction.newAuction("img1", "text1", {
      value: ethers.utils.parseUnits("2", "wei"),
    });
    let auctionValues = await auction.auction();

    console.log(auctionValues);
    await auction.newAuction("img2", "text2", {
      value: ethers.utils.parseUnits("3", "wei"),
    });

    auctionValues = await auction.auction();

    console.log(auctionValues);
  });
});
