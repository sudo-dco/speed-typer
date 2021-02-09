import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Rooms from "./features/rooms/Rooms";
import {
    selectSentence,
    incrementChar,
    fetchSentence,
} from "./features/sentence/sentenceSlice";
import { downHandler, selectKey } from "./features/keypress/keypressSlice";
import { setStart, calculate, selectWpm } from "./features/wpm/wpmSlice";

function App() {
    const dispatch = useDispatch();

    // sentence
    const { loading, text, currentChar, preChars } = useSelector(
        selectSentence
    );

    useEffect(() => {
        if (loading === "idle") {
            dispatch(fetchSentence());
        }
    }, [loading, dispatch]);

    // keypress
    const { key, totalTyped } = useSelector(selectKey);

    // wpm
    const { grossWpm, startTime, accuracy } = useSelector(selectWpm);

    // incorrect text
    const [isRed, setIsRed] = useState(false);

    // const toggleColor = (status) => {
    //     if (startTime !== null) {
    //         if (status === true && isRed === false) {
    //             setIsRed(true);
    //         }

    //         if (status === false && isRed === true) {
    //             setIsRed(false);
    //         }
    //     }
    // };

    useEffect(() => {
        const checkKey = ({ key }) => {
            if (key.length === 1) {
                dispatch(downHandler(key));
            }
        };

        window.addEventListener("keydown", checkKey);

        return () => {
            window.removeEventListener("keydown", checkKey);
        };
    }, []);

    // process key presses
    if (key === currentChar) {
        if (startTime === 0) {
            dispatch(setStart(new Date().getTime()));
        }

        dispatch(incrementChar());
    }

    // calculate wpm when user finishes sentence
    if (preChars.length === text.length && startTime > 0 && grossWpm === 0) {
        dispatch(
            calculate({
                stopTime: new Date().getTime(),
                length: text.length,
                totalTyped,
            })
        );
    }

    return (
        <div className="App">
            <Rooms />
            <div>{text}</div>
            <input
                type="text"
                name="textInput"
                value={preChars}
                size="100"
                className={isRed ? "textbox animate-red" : "textbox"}
                readOnly
            />
            <div>
                WPM: {grossWpm} / Accuracy: {accuracy}%
            </div>
        </div>
    );
}

export default App;
