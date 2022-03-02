import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { contractAddress } from "./config";
import Auction from "./artifacts/contracts/Auction.sol/Auction.json";
import { ethers } from "ethers";
import { create as ipsfsHttpClient } from "ipfs-http-client";

const client = ipsfsHttpClient("https://ipfs.infura.io:5001/");

export const getWeb3Modal = async () => {
  const web3modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        },
      },
    },
  });
  return web3modal;
};

export const getContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Auction.abi, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const newAuction = async (img, desc, value) => {
  if (!img || !desc || !value) return;
  try {
    const contract = await getContract();

    const added = await client.add(img);
    const imgAddress = `https://ipfs.infura.io/ipfs/${added.path}`;

    const auction = await contract.newAuction(imgAddress, desc, {
      value: ethers.utils.parseUnits(value, "wei"),
    });
    await auction.wait();
  } catch (error) {
    if (
      error.data.message.includes("You must pay more than last bid amopunt.")
    ) {
      return "You must pay more than last bid amopunt.";
    }
  }
};

export const auction = async () => {
  const contract = await getContract();
  const auction = await contract.auction();
  return auction;
};
