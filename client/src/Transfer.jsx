import { useState } from "react";
import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils';
import { keccak256 }  from 'ethereum-cryptography/keccak';

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {

      const message = "TRX - Transfer amount"
      const bytes = utf8ToBytes(message);
      const messageHash = toHex(keccak256(bytes));
    
      //Signing the message using the private key
      let signature = secp.secp256k1.sign(messageHash, privateKey);
      //Convert to CompactHex format in order to send to server via http
      const compactSig = signature.toCompactHex();

      //calling send api to transfer funds
      const { data: { balance, msg }, } = await server.post(`send`, {
        amount: parseInt(sendAmount),
        recipient,
        messageHash: messageHash,
        signature: compactSig,
        recoveryBit: signature.recovery
      });

      setBalance(balance);
      alert(msg);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <div>
        Private Key: {privateKey.slice(0,20)}.....{privateKey.slice(-3)}
      </div>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
