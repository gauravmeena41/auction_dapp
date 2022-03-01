//SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract Auction {
    address payable public owner;
    string imageAddress;
    string text;
    uint256 lastAuctionAmount = 0;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function auction()
        external
        view
        returns (
            string memory,
            string memory,
            uint256
        )
    {
        return (imageAddress, text, lastAuctionAmount);
    }

    function newAuction(string memory _imageAddress, string memory _text)
        external
        payable
    {
        require(
            msg.value > lastAuctionAmount,
            "You must pay more than last bid amopunt."
        );
        require(
            bytes(_imageAddress).length > 0,
            "You need to send a image address."
        );
        require(bytes(_text).length > 0, "You need to send a text.");
        owner.transfer(msg.value);
        imageAddress = _imageAddress;
        text = _text;
        lastAuctionAmount = msg.value;
    }
}
