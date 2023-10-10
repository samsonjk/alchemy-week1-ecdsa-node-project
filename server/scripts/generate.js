const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log("Private Key: ", toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);

console.log("Public Key: ", toHex(publicKey));

const initialBalance = Math.random() * (100 - 10) + 10;

//console.log("Public Key: ", "0x" + toHex(keccak256(publicKey.slice(1)).slice(-20)));