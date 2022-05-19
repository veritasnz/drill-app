import React from "react";

export interface SettingsContextState {
    autoplayIsOn: boolean;
    toggleAutoplayIsOn: () => void;
    showFurigana: boolean;
    toggleShowFurigana: () => void;
    showEnglish: boolean;
    toggleShowEnglish: () => void;
    resetSettings: () => void;
}

const defaultState: SettingsContextState = {
    autoplayIsOn: true,
    toggleAutoplayIsOn: () => {},
    showFurigana: true,
    toggleShowFurigana: () => {},
    showEnglish: true,
    toggleShowEnglish: () => {},
    resetSettings: () => {},
};

const SettingsContext = React.createContext<SettingsContextState>(defaultState);

export default SettingsContext;
