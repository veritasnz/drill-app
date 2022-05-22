import { useCallback, useEffect, useRef } from "react";

/**
 * Passes key event to callback function, only for keys passed into the 'keys' parameter
 * @param keys An array of strings representing the
 * @param callback The function to be called if one of the keys is pressed
 * 
 * Source: https://devtrium.com/posts/how-keyboard-shortcut
 */
const useKeyPress = (
    keys: string[],
    callback: (event: KeyboardEvent) => void
) => {
    // implement the callback ref pattern
    const callbackRef = useRef(callback);
    useEffect(() => {
        callbackRef.current = callback;
    });

    // handle what happens on key press
    const handleKeyPress = useCallback(
        (event) => {
            // check if one of the key is part of the ones we want
            if (keys.some((key) => event.code === key)) {
                callbackRef.current(event);
            }
        },
        [keys]
    );

    useEffect(() => {
        // attach the event listener
        document.addEventListener("keydown", handleKeyPress);

        // remove the event listener
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);
};

export default useKeyPress;
