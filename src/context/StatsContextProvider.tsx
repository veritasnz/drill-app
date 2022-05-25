import React, { useState, useEffect } from "react";

import LSKeyEnum from "../models/LocalStorageKeyEnum.model";

import StatsContext from "./stats-context";

const StatsContextProvider: React.FC = (props) => {
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [totalCorrectAttempts, setTotalCorrectAttempts] = useState(0);

    const incrementTotalAttempts = () => {
        const newTotalAttempts = totalAttempts + 1;
        setTotalAttempts(newTotalAttempts);
        localStorage.setItem(LSKeyEnum.STATS_ATTEMPTS_ALL, newTotalAttempts.toString());
    };

    const incrementTotalCorrectAttempts = () => {
        const newTotalCorrectAttempts = totalCorrectAttempts + 1;
        setTotalCorrectAttempts(newTotalCorrectAttempts);
        localStorage.setItem(
            LSKeyEnum.STATS_ATTEMPTS_CORRECT,
            newTotalCorrectAttempts.toString()
        );
    };

    useEffect(() => {
        const storedTotalAttempts = localStorage.getItem(LSKeyEnum.STATS_ATTEMPTS_ALL);
        const storedTotalCorrectAttempts = localStorage.getItem(
            LSKeyEnum.STATS_ATTEMPTS_CORRECT
        );

        if (storedTotalAttempts && storedTotalAttempts !== "-1") {
            setTotalAttempts(+storedTotalAttempts);
        }

        if (storedTotalCorrectAttempts && storedTotalCorrectAttempts !== "-1") {
            setTotalCorrectAttempts(+storedTotalCorrectAttempts);
        }
    }, []);

    const resetStats = () => {
        // Reset total attempts
        setTotalAttempts(0);
        localStorage.setItem(LSKeyEnum.STATS_ATTEMPTS_ALL, "0");

        // Reset total correct attempts
        setTotalCorrectAttempts(0);
        localStorage.setItem(LSKeyEnum.STATS_ATTEMPTS_CORRECT, "0");
    };

    return (
        <StatsContext.Provider
            value={{
                totalAttempts,
                incrementTotalAttempts,
                totalCorrectAttempts,
                incrementTotalCorrectAttempts,
                resetStats,
            }}
        >
            {props.children}
        </StatsContext.Provider>
    );
};

export default StatsContextProvider;
