const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02d6998a6ca3404857dd2cc9cd482699c697a5a1a0eb93e10b2aeb4030fa9805be": 1000,
  "03579fdd631a5246d48d1b516b502766dc4c2b6545384b7553032f5e12fe92f782": 500,
  "039a6b3f033f944ad5e44a0a39c2c546732b1e6165b0da281005d3f8218af5e8d2": 750,
  "0291c67cf6c5604d2ada24c672e4c51c2018e7dc0ef880d73c363fba3c8c45cbd5": 100,
  "02619452eb60709544b847810c283f3e0c0cde9107a8d29eacf813d2cad663b7e0": 50
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/balances", (req, res) => {
  res.send(balances);
})


//Function to Generate a random pub/private keypair. 
//Cuurently not used on the UI
app.get("/generate", (req, res) => {
  const privateKey = secp.secp256k1.utils.randomPrivateKey();

  console.log("Private Key: ", toHex(privateKey));

  const publicKey = secp.secp256k1.getPublicKey(privateKey);

  console.log("Public Key: ", toHex(publicKey));

  const initialBalance = Math.round(Math.random() * (100 - 10) + 10);

  balances[toHex(publicKey)] = initialBalance;

  res.status(200).send({ message: "Generated new private/public keypair!" });

})

app.post("/send", (req, res) => {

  //TODO: get the signature from client-side application.
  // recover the public address from the signature

  const { recipient, amount, messageHash, signature, recoveryBit } = req.body;

  // Convert the signature to raw format and adding the recoverybit
  const _signature = secp.secp256k1.Signature.fromCompact(signature).addRecoveryBit(recoveryBit);
  const msgHash = hexToBytes(messageHash);

  //Recover the public key from the signature
  const recoveredPublicKey = _signature.recoverPublicKey(msgHash).toRawBytes();

  //Sender Address
  const sender = toHex(recoveredPublicKey);

  // Verifying the signature
  const isSigned = secp.secp256k1.verify(_signature, msgHash, sender);

  if (isSigned) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender], msg: "Funds Transfer Successful!" });
    }
  }
  else {
    res.status(401).send({ message: "Unauthorized Transfer" });
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
