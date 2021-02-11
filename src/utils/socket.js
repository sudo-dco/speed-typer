import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT);

socket.on("connect", () => {
    console.log("connected");
});

export default socket;
