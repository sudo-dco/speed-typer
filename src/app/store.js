import { configureStore } from "@reduxjs/toolkit";
import sentenceReducer from "../features/sentence/sentenceSlice";

export default configureStore({
    reducer: {
        sentence: sentenceReducer,
    },
});
