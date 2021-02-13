import { createSlice } from "@reduxjs/toolkit";
import socket from "../../utils/socket";
import axios from "axios";

export const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        playerName: "",
        playerList: [],
        roomId: null,
    },
    reducers: {
        setUsername(state, action) {
            const name = action.payload;
            state.playerName = name;
            socket.emit("set username", name);
        },
        updatePlayerList(state, action) {
            const name = action.payload;
            state.playerList.push(name);
        },
        createRoom(state, action) {
            axios
                .get("/create")
                .then((response) => {
                    let id = response.data;
                    state.roomId = id;
                    socket.emit("create room", state.playerName, id);
                })
                .catch((error) => {
                    console.error("Error creating room");
                });
        },
        joinRoom(state, action) {
            const roomId = action.payload;
            state.roomId = roomId;
            socket.emit("join room", state.playerName, roomId);
        },
    },
});

export const { setUsername, updatePlayerList } = roomsSlice.actions;

export default roomsSlice.reducer;
