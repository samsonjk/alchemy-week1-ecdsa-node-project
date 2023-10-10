# alchemy-week1-ecdsa-node-project
ECDSA Node project - Alchemy Week1 Project


The project is to demonstrate peer-to-peer secure transactions.
The below features are implemented in this demo project.
Public Key & Digital Signatures  (Recover Keys, Sign Message, Hash Messages)
The Ethereum Cryptography library  is used.
The random private key generation is used to generate a random number of public/private key pairs.
Working Model.
Since this is a demo project, we are using the private key of the account as input rather than any other wallets(ex: Metamask) to perform transactions.

The message is hashed and signed using the private key and sent over HTTP to the server with the below parameters.
Parameters:
recipient
messageHash
signature
recoveryBit
amount

The server recovers the public key from the signature using the messageHash and recoveryBit.
Then the server verifies the signature with the recovered public key.
If the signature is valid, then the transaction is performed otherwise returned as unauthorized.


## Project Instruction

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.


