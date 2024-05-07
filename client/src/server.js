import axios from "axios";

const server = axios.create({
  baseURL: "https://alchemy-week1-ecdsa-node-project-server.vercel.app",
});

export default server;
