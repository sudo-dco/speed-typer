import { createSlice } from "@reduxjs/toolkit";

export const wpmSlice = createSlice({
    name: "wpm",
    initialState: {
        grossWpm: 0,
        startTime: 0,
        accuracy: 0,
    },
    reducers: {
        setStart(state, action) {
            state.startTime = action.payload;
        },
        calculate(state, action) {
            const { stopTime, length, totalTyped } = action.payload;

            const mins = (stopTime - state.startTime) / 60000;
            state.grossWpm = (length / 5 / mins).toFixed(2);

            state.accuracy = ((length / totalTyped) * 100).toFixed(2);
        },
    },
});

export const { setStart, calculate } = wpmSlice.actions;

export const selectWpm = (state) => state.wpm;

export default wpmSlice.reducer;
