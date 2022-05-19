import React, { useEffect, useState } from "react";

import SettingsContext from "./settings-context";

/** Settings Local Storage Keys */
enum LSKey {
    AUTOPLAY_IS_ON = "autoplay_is_on",
    SHOW_FURIGANA = "show_furigana",
    SHOW_ENGLISH = "show_english",
}

const SettingsContextProvider: React.FC = (props) => {
    // Toggle booleans
    const [autoplayIsOn, setAutoplayIsOn] = useState(true);
    const [showFurigana, setShowFurigana] = useState(true);
    const [showEnglish, setShowEnglish] = useState(true);

    // Initialize & load from localStorage
    useEffect(() => {
        loadBooleanStateValue(LSKey.AUTOPLAY_IS_ON, setAutoplayIsOn);
        loadBooleanStateValue(LSKey.SHOW_FURIGANA, setShowFurigana);
        loadBooleanStateValue(LSKey.SHOW_ENGLISH, setShowEnglish);
    }, []);

    // Create toggle functions
    const toggleAutoplayIsOn = toggleBoolStateFnBuilder(
        LSKey.AUTOPLAY_IS_ON,
        setAutoplayIsOn
    );
    const toggleShowFurigana = toggleBoolStateFnBuilder(
        LSKey.SHOW_FURIGANA,
        setShowFurigana
    );
    const toggleShowEnglish = toggleBoolStateFnBuilder(
        LSKey.SHOW_ENGLISH,
        setShowEnglish
    );

    // Reset settings Fn
    const resetSettings = () => {
        resetSetting(LSKey.AUTOPLAY_IS_ON, setAutoplayIsOn, true);
        resetSetting(LSKey.SHOW_FURIGANA, setShowFurigana, true);
        resetSetting(LSKey.SHOW_ENGLISH, setShowEnglish, true);
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
    lsKey: LSKey,
    setter: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const storedValue = localStorage.getItem(lsKey);
    if (storedValue === "false") setter(false); // only set to false explicitly
};

// Builds a toggling function based on the LocalStorage key parameter
const toggleBoolStateFnBuilder = (
    lskey: LSKey,
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
    lskey: LSKey,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    defaultValue: boolean
) => {
    localStorage.setItem(lskey, defaultValue.toString());
    setter(defaultValue);
};
