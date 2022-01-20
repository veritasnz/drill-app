import { useEffect, useState } from "react";

type UseTimer = (
    delayedFn: Function,
    duration: number
) => [boolean, () => void];

let correctAnswerTimer: any;

const useTimer: UseTimer = (delayedFn: Function, duration: number) => {
    const [isTicking, setIsTicking] = useState(false);

    const startTimer = () => {
        clearTimeout(correctAnswerTimer);
        setIsTicking(true);
        correctAnswerTimer = setTimeout(() => {
            setIsTicking(false);
            delayedFn();
        }, 1000);
    };

    // Timer cleanup
    useEffect(() => {
        return () => clearTimeout(correctAnswerTimer);
    }, []);

    return [isTicking, startTimer];
};

export default useTimer;
