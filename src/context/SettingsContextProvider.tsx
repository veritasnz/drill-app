import React, { useEffect } from "react";

import SettingsContext from "./settings-context";

/** Settings Local Storage Keys */
enum LSKey {}

const SettingsContextProvider: React.FC = (props) => {
    // Load from memory
    useEffect(() => {}, []);

    return (
        <SettingsContext.Provider value={{}}>
            {props.children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;
