import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT);

socket.on("connect", () => {
    console.log("connected");
});

export const socketIOSlice = createSlice({
    name: "socketIO",
    initialState: {
        playerList: [],
    },
    reducers: {
        updateUserList(state, action) {
            socket.on("update playerlist", () => {
                // add name to user list
            });
        },
    },
});

export const { updateUserList } = socketIOSlice.actions;

export default socketIOSlice.reducer;
