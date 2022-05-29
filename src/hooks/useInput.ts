import React, { useState } from "react";

/**
 * useInput
 *
 * Hook that intakes a validation function, and outputs all vars needed to attach to an <input>
 * Internally evaluates the inputted value and returns a boolean representing that value's validity
 * Also internally handles the blurring and focusing of <inputs>
 *
 * @param validateValue Function used to validate input
 * @returns
 */
const useInput = (validateValue: (p: string) => boolean) => {
    // Create necessary states
    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    // Set derived values
    const valueIsValid = validateValue(enteredValue);
    const hasError = isTouched && !valueIsValid;

    // Generic logic inside our
    const inputChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = () => {
        if (enteredValue) setIsTouched(true);
    };

    // Generic reset
    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    };

    // Return all states and functions needed by form component
    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;
