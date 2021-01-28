import { createSlice } from "@reduxjs/toolkit";

export const textInputSlice = createSlice({
    name: "textInput",
    initialState: {
        text: "",
    },
    reducers: {},
});

export default textInputSlice.reducer;
