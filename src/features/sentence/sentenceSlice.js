import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSentence = createAsyncThunk(
    "/sentence/fetchSentences",
    async () => {
        const response = await axios.get("/sentence");
        return response.data;
    }
);

export const sentenceSlice = createSlice({
    name: "sentence",
    initialState: {
        text: "",
        loading: "idle",
    },
    reducers: {},
    extraReducers: {
        [fetchSentence.fulfilled]: (state, action) => {
            state.text = action.payload;
        },
    },
});

export const selectFetchStatus = (state) => state.sentence.loading;
export const selectText = (state) => state.sentence.text;

export default sentenceSlice.reducer;
