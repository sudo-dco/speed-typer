import React from "react";
import socket from "../../utils/socket";
import { useDispatch } from "react-redux";
import { updatePlayerList } from "./roomsSlice";

const Rooms = () => {
    const dispatch = useDispatch();
    const players = [];
    let roomid = 0;

    const handleCreate = () => {};

    const handleJoin = () => {};

    socket.on("update playerlist", (name) => {
        // figure out how to call this from outside slice
        dispatch(updatePlayerList(name));
    });

    return (
        <div>
            <button>Create Room</button>
            <button>Join Room</button>
            <p>Room ID: {roomid}</p>
            <div>
                <h5>Player List:</h5>
                <div></div>
            </div>
        </div>
    );
};

export default Rooms;
