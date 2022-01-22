import { useEffect, useState } from "react";

type UseTimer = (duration: number) => [boolean, (delayedFn: Function) => void];

let correctAnswerTimer: any;

const useTimer: UseTimer = (duration: number) => {
    const [isTicking, setIsTicking] = useState(false);

    const startTimer = (delayedFn: Function) => {
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
