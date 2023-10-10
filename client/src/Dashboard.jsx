import { useState } from "react";
import server from "./server";

export default function Dashboard() {

    const keyPairs = [
        {
            "privateKey": "235e49cf2c0ca67f0b9eae75e9fd462f2890e63997dfd8e4502e3f3af40da6fe",
            "publicKey": "02d6998a6ca3404857dd2cc9cd482699c697a5a1a0eb93e10b2aeb4030fa9805be",
            "balance": 0
        },
        {
            "privateKey": "2e3b4abb11580068c479b5f025bb39a8a751b47f578e719ba23c96debc653e27",
            "publicKey": "03579fdd631a5246d48d1b516b502766dc4c2b6545384b7553032f5e12fe92f782",
            "balance": 0
        },
        {
            "privateKey": "0e84f4f946ef6482e2875e684f9b4773923fe3b2fad1738f1d6466485d8e9011",
            "publicKey": "039a6b3f033f944ad5e44a0a39c2c546732b1e6165b0da281005d3f8218af5e8d2",
            "balance": 0
        },
        {
            "privateKey": "2f092e97b6f661a51a58c03618844b999889b0220a519c6e00f1b0375df89bee",
            "publicKey": "0291c67cf6c5604d2ada24c672e4c51c2018e7dc0ef880d73c363fba3c8c45cbd5",
            "balance": 0
        },
        {
            "privateKey": "b86eb5c3074e9631b0d6c913e26f9b1dbccd7ac8d5b0b1d017a0d45b9d70a283",
            "publicKey": "02619452eb60709544b847810c283f3e0c0cde9107a8d29eacf813d2cad663b7e0",
            "balance": 0
        }
    ];

    const balances = { "033aa0be6abca7e7d595f2f2ea6d1413ea5c925d4f427e38c9ab659c12d0d62c98": 1000, "0204108a09d3587e1c5dac6946360188cc1563e437e3b62198563 3957d06c322d1": 500, "03022e56a386b9e089bd727a6ce87dbb7fc158751a488f83ef31c0c633b681b47e": 750 };

    async function generateKeyPair() {
        const {
            data: { message },
        } = await server.get(`generate`);

        alert(message);
    }

    return (
        <div className="container wallet">
            <h1>Instructions</h1>
            <ul>
                <li>For demo purposes, The private key is used as input to sign it.</li>
                <li>There are five key pair accounts with random balances</li>
                <li>Choose any account(this will be the sender),</li>
                <li>Copy the private key and paste on the Wallet Section. </li>
                <li>This will display its corresponding public Address and the balance</li>
                <li>Choose any account other than the sender. </li>
                <li>Then copy the public key and paste on the Send Transaction Section (receipient)</li>
                <li>Enter the amount to be sent</li>
                <li>Click "Transfer" to send the amount to the receipient</li>

            </ul>
            <h1>Account Key Pair for Demo Purposes</h1>
            <div className="dashboard">
                {keyPairs.map((item) => (
                    <div key={item.publicKey}> <span>Private Key: {item.privateKey}</span><br/><br/>
                    <span>Public Key: {item.publicKey}</span><br/>
                    <hr/>
                    </div>
                ))}
            </div>


           {/*  <button className="button" onClick={generateKeyPair} >Generate Key Pair</button> */}
        </div>
    )
}