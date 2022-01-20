import React from "react";

export interface SettingsContextState {}

const defaultState: SettingsContextState = {};

const SettingsContext = React.createContext<SettingsContextState>(defaultState);

export default SettingsContext;
