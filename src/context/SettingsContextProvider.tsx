import React, { useEffect, useState } from "react";

import LSKeyEnum from "../models/LocalStorageKeyEnum.model";

import SettingsContext from "./settings-context";

const SettingsContextProvider: React.FC = (props) => {
    // Toggle booleans
    const [autoplayIsOn, setAutoplayIsOn] = useState(true);
    const [showFurigana, setShowFurigana] = useState(true);
    const [showEnglish, setShowEnglish] = useState(true);

    // Initialize & load from localStorage
    useEffect(() => {
        loadBooleanStateValue(LSKeyEnum.SETTING_AUTOPLAY, setAutoplayIsOn);
        loadBooleanStateValue(LSKeyEnum.SETTING_SHOW_FURI, setShowFurigana);
        loadBooleanStateValue(LSKeyEnum.SETTING_SHOW_ENG, setShowEnglish);
    }, []);

    // Create toggle functions
    const toggleAutoplayIsOn = toggleBoolStateFnBuilder(
        LSKeyEnum.SETTING_AUTOPLAY,
        setAutoplayIsOn
    );
    const toggleShowFurigana = toggleBoolStateFnBuilder(
        LSKeyEnum.SETTING_SHOW_FURI,
        setShowFurigana
    );
    const toggleShowEnglish = toggleBoolStateFnBuilder(
        LSKeyEnum.SETTING_SHOW_ENG,
        setShowEnglish
    );

    // Reset settings Fn
    const resetSettings = () => {
        resetSetting(LSKeyEnum.SETTING_AUTOPLAY, setAutoplayIsOn, true);
        resetSetting(LSKeyEnum.SETTING_SHOW_FURI, setShowFurigana, true);
        resetSetting(LSKeyEnum.SETTING_SHOW_ENG, setShowEnglish, true);
    };

    return (
        <SettingsContext.Provider
            value={{
                autoplayIsOn,
                toggleAutoplayIsOn,
                showFurigana,
                toggleShowFurigana,
                showEnglish,
                toggleShowEnglish,
                resetSettings,
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;

/**
 * Toggle Boolean Helper Functions
 */
// Helper function to set Boolean state val from LS given a LSKey
const loadBooleanStateValue = (
    lsKey: LSKeyEnum,
    setter: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const storedValue = localStorage.getItem(lsKey);
    if (storedValue === "false") setter(false); // only set to false explicitly
};

// Builds a toggling function based on the LocalStorage key parameter
const toggleBoolStateFnBuilder = (
    lskey: LSKeyEnum,
    setter: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return () => {
        setter((prevState) => {
            const newState = !prevState;
            localStorage.setItem(lskey, newState.toString());
            return newState;
        });
    };
};

// Clearing function based on the LocalStorage key parameter and default value
const resetSetting = (
    lskey: LSKeyEnum,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    defaultValue: boolean
) => {
    localStorage.setItem(lskey, defaultValue.toString());
    setter(defaultValue);
};
