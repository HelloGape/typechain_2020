"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, hash, previoushash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previoushash = previoushash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.calculateBlockHash = function (index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    };
    Block.validateStructure = function (aBlock) {
        return typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previoushash === "string" &&
            typeof aBlock.timestamp === "number" &&
            typeof aBlock.data === "string";
    };
    return Block;
}());
var genesisBlock = new Block(0, "202002020202020", "", "Hello", 123456);
Block.calculateBlockHash;
var blockChain = [genesisBlock];
var getBlockChain = function () { return blockChain; };
var getLatestBlock = function () { return blockChain[blockChain.length - 1]; };
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previousBlock = getLatestBlock();
    var newIndex = previousBlock.index + 1;
    var newTimeStamp = getNewTimeStamp();
    var newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    var newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashForBlock = function (aBlock) {
    return Block.calculateBlockHash(aBlock.index, aBlock.previoushash, aBlock.timestamp, aBlock.data);
};
var isBlockValid = function (candidateBlock, previousBlock) {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previoushash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
var addBlock = function (candidateBlock) {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("secondBlock");
createNewBlock("thirdBlock");
createNewBlock("fourthBlock");
console.log(blockChain);
//# sourceMappingURL=index.js.map