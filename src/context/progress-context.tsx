import React from "react";

/*
 * Context
 */

export interface ProgressContextState {
    answeredQuestions: string[];
    addAnsweredQuestionId: (questionId: string) => void;
    removeAnsweredQuestionsIds: (questionIds: string[]) => void;
    currentLevelId: string;
    setLevelId: (levelId: string) => void;
}

const defaultState: ProgressContextState = {
    answeredQuestions: [],
    addAnsweredQuestionId: (questionIds: string) => {},
    removeAnsweredQuestionsIds: (questionIds: string[]) => {},
    currentLevelId: "",
    setLevelId: (levelId: string) => {},
};

const ProgressContext =
    React.createContext<ProgressContextState>(defaultState);

export default ProgressContext;
