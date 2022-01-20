import React from "react";

export interface SettingsContextState {
    currentLevelId: string;
    setLevelId: (levelId: string) => void;
    // currentStageId: string;
    // setStageId: (stageId: string) => void;
}

const defaultState: SettingsContextState = {
    currentLevelId: "",
    setLevelId: (levelId: string) => {},
    // currentStageId: "",
    // setStageId: (stageId: string) => {},
};

const SettingsContext = React.createContext<SettingsContextState>(defaultState);

export default SettingsContext;
