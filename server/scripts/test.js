const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = "cfafbbdd883b6038c24e4fd79fb02d5f20a4fecbd6088c3c61b5b821e4e22045"
const publicKey = "03ff90bdfebea7c2eafee8ecf894faeee6aa7450ec2844d3b010f58748410faab0"

const message = "Transfer amount transaction"

const bytes = utf8ToBytes(message);

const messageHash = keccak256(bytes);

let signature = secp.secp256k1.sign(messageHash, privateKey);

console.log("Signed Msg: ", signature);

//This is the format to use to send to the server
console.log("Signed Msg: ", signature.toCompactHex());

const isSigned = secp.secp256k1.verify(signature, messageHash, publicKey);

console.log("Signature Verification: ", isSigned);

console.log("Message Hash: ", toHex(messageHash));

const point = signature.recoverPublicKey(messageHash).toRawBytes();

console.log("recoveredPublicKey: ",toHex(point));




