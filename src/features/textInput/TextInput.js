import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectText } from "../sentence/sentenceSlice";

export function TextInput() {
    const [status, setStatus] = useState(null);
    const [userInput, setUserInput] = useState("");
    const text = useSelector(selectText);

    const handleInput = (e) => {
        // console.log(e.keyCode);
        processText(e.target.value);
    };

    const processText = (input) => {
        const splitText = text.split("");
        const splitInput = input.split("");

        if (splitInput.length === 0) {
            setStatus(null);
        }

        splitInput.forEach((char, i) => {
            if (char === splitText[i]) {
                setStatus("correct");
            } else {
                setStatus("incorrect");
            }
        });
    };

    return (
        <div>
            <input type="text" name="input" onKeyDown={handleInput} />
            <p>{status}</p>
        </div>
    );
}
