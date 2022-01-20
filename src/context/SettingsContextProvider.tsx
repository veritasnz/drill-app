import React, { useState, useEffect } from "react";

import SettingsContext from "./settings-context";

/** Settings Local Storage Keys */
enum LSKey {
    STAGE_KEY = "current_stage_id",
    LEVEL_KEY = "current_level_id",
}

const INITIAL_LEVEL_ID = "yajirobe";

const SettingsContextProvider: React.FC = (props) => {
    const [currentLevel, setCurrentLevel] = useState(INITIAL_LEVEL_ID);

    // Load from memory
    useEffect(() => {
        const storedCurrentLevelId = localStorage.getItem(LSKey.LEVEL_KEY);
        if (storedCurrentLevelId) setLevelId(storedCurrentLevelId);
    }, []);

    const setLevelId = (level: string) => {
        setCurrentLevel(level);
        localStorage.setItem(LSKey.LEVEL_KEY, level);
    };

    return (
        <SettingsContext.Provider
            value={{
                currentLevelId: currentLevel,
                setLevelId: setLevelId,
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;
