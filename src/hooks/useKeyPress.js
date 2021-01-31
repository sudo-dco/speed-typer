import { useState, useEffect } from "react";

export function useKeyPress() {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(null);

    // If pressed key is our target key then set to true
    function downHandler({ key }) {
        if (key !== keyPressed) {
            setKeyPressed(key);
        }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        setKeyPressed(null);
    };

    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return keyPressed;
}
