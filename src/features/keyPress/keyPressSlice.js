import { createSlice } from "@reduxjs/toolkit";

export const keyPressSlice = createSlice({
    name: "keypress",
    initialState: {
        key: null,
        totalTyped: 0,
    },
    reducers: {
        downHandler(state, action) {
            state.key = action.payload;
            state.totalTyped += 1;
        },
    },
});

export const { downHandler } = keyPressSlice.actions;

export const selectKey = (state) => state.keypress;

export default keyPressSlice.reducer;
