import React, { useState, useEffect } from "react";
import { Sentence } from "./features/sentence/Sentence";
import { useKeyPress } from "./hooks/useKeyPress";
import axios from "axios";

function App() {
    const [sentence, setSentence] = useState("");
    const [preChars, setPreChars] = useState("");
    const [postChars, setPostChars] = useState("");
    const [currentChar, setCurrentChar] = useState();
    const [textInput, setTextInput] = useState("");

    // wpm
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const currentTime = () => new Date().getTime();

    // incorrect text
    const [isRed, setIsRed] = useState(false);

    useEffect(() => {
        axios
            .get("/sentence")
            .then((response) => {
                const sentence = response.data;

                setSentence(sentence);
                setCurrentChar(sentence[0]);
                setPostChars(sentence.substring(1));
            })
            .catch((err) => {
                console.log("error fetching sentence: ", err);
            });
    }, []);

    useEffect(() => {
        if (startTime > 0 && textInput.length === sentence.length) {
            const stopTime = currentTime();
            const mins = (stopTime - startTime) / 60000;
            const numOfChars = sentence.length;

            const grossWpm = (numOfChars / 5 / mins).toFixed(2);
            setWpm(grossWpm);
        }
    }, [textInput, sentence.length, startTime]);

    const toggleColor = (status) => {
        if (startTime !== null) {
            if (status === true && isRed === false) {
                setIsRed(true);
            }

            if (status === false && isRed === true) {
                setIsRed(false);
            }
        }
    };

    let key = useKeyPress();
    console.log(key);

    // if key matches current char
    if (key === currentChar) {
        // on first correct key press, start timer
        if (startTime === null) {
            setStartTime(currentTime());
        }

        // remove incorrect class
        toggleColor(false);

        // append current char to prechars
        setPreChars(preChars + currentChar);

        // append to textinput
        setTextInput(textInput + currentChar);

        // get next current char from post char
        setCurrentChar(postChars[0]);
        setPostChars(postChars.substring(1));
    } else if (key !== currentChar) {
        toggleColor(true);
    }

    return (
        <div className="App">
            <div>{sentence}</div>
            <div>Pre: {preChars}</div>
            <input
                type="text"
                name="textInput"
                value={textInput}
                size="100"
                className={isRed ? "textbox animate-red" : "textbox"}
            />
            <div>WPM: {wpm}</div>
        </div>
    );
}

export default App;
