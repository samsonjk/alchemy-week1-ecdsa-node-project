import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1';

import { toHex } from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    //Getting the public key from private key
    const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));

    //Code to extract actual Eth address
    //const address = "0x" + keccak256(publicKey.slice(1)).slice(-20);

    const address = publicKey;

    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address.slice(0,20)}.....{address.slice(-3)}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
