import { configureStore } from "@reduxjs/toolkit";
import sentenceReducer from "../features/sentence/sentenceSlice";
import keypressReducer from "../features/keypress/keypressSlice";
import wpmReducer from "../features/wpm/wpmSlice";
import roomsReducer from "../features/rooms/roomsSlice";

export default configureStore({
    reducer: {
        sentence: sentenceReducer,
        keypress: keypressReducer,
        wpm: wpmReducer,
        rooms: roomsReducer,
    },
});
