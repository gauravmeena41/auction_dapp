import Head from "next/head";
import { useEffect, useState } from "react";
import { auction, newAuction } from "../helper";

export default function Home() {
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [auctionValue, setAuctionValue] = useState("");
  const [lastAuction, setLastAuction] = useState([]);

  const fetchAuction = async () => {
    setLastAuction(await auction());
  };

  useEffect(() => {
    fetchAuction();
  }, [desc.length <= 0]);

  return (
    <div className="flex items-center justify-around h-[100vh]">
      <Head>
        <title>Auction Dapp</title>
      </Head>

      <div
        className="flex flex-col items-center w-[600px] space-y-5 shadow-xl hover:shadow-2xl p-5 bg-[#272727]
      rounded-lg"
      >
        <h1 className="text-3xl font-semibold">Now Featuring</h1>
        <img
          src={lastAuction[0] ? lastAuction[0] : ""}
          alt=""
          className="w-5/6 h-auto max-h-[400px] object-cover rounded-lg"
        />
        <div className="grid grid-cols-5 place-items-center space-x-5">
          <h1 className="col-span-3 text-xl ">
            {lastAuction[1] ? lastAuction[1] : ""}
          </h1>
          <h1 className="col-span-2 text-sm font-semibold text-gray-500">
            Last bid:
            {lastAuction[2] ? lastAuction[2].toNumber() : 0} Wei
          </h1>
        </div>
      </div>

      <div className=" shadow-xl hover:shadow-2xl w-[500px] bg-[#272727] p-10 rounded-lg space-y-10 ">
        <h1 className="text-center text-xl font-semibold">
          Create your auction
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!file) {
              alert("You must add a image.");
              return;
            }
            const res = await newAuction(file, desc, auctionValue);
            if (res === "You must pay more than last bid amount.") {
              alert(res);
            }
            setDesc("");
            setAuctionValue("");
            setFile("");
          }}
          className="flex flex-col space-y-5"
        >
          <input
            type="text"
            placeholder="What's on your mind?"
            value={desc}
            required
            onChange={(e) => setDesc(e.target.value)}
            className={`bg-gray-600 rounded outline-none px-4 py-1 ${
              desc === "" ? "focus:placeholder:text-red-400" : ""
            }`}
          />
          <input
            type="number"
            placeholder="Enter auction value in wei"
            value={auctionValue}
            required
            onChange={(e) => setAuctionValue(e.target.value)}
            className={`bg-gray-600 rounded outline-none px-4 py-1 ${
              !auctionValue ? "focus:placeholder:text-red-400" : ""
            }`}
          />
          <label
            htmlFor="file"
            className="cursor-pointer bg-green-500 text-center font-semibold"
          >
            Choose File
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name=""
            id="file"
            className="hidden"
          />
          {file && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="rounded-lg max-w-5/6 h-auto max-h-[300px] object-cover"
              />
            </div>
          )}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 px-10 py-2 rounded font-semibold"
              type="submit"
            >
              Create Auction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
