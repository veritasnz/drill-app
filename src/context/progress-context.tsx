import React from "react";
import Question from "../models/Question.model";

/*
 * Context
 */

export interface ProgressContextState {
    state: {
        answeredQuestionIds: string[];
        currentLevelId: string;
        currentLevelNum: number;
        graveyard: Question[];
    };

    addAnsweredQuestionId: (questionId: string) => void;
    removeAnsweredQuestionsIds: (questionIds: string[]) => void;
    setLevelId: (levelId: string) => void;
    addGraveyardQuestion: (question: Question) => void;
    removeGraveyardQuestionById: (questionId: string) => void;
    resetProgress: () => void;
}

const defaultState: ProgressContextState = {
    state: {
        answeredQuestionIds: [],
        currentLevelId: "",
        currentLevelNum: -1,
        graveyard: [],
    },
    addAnsweredQuestionId: (questionIds: string) => {},
    removeAnsweredQuestionsIds: (questionIds: string[]) => {},
    setLevelId: (levelId: string) => {},
    addGraveyardQuestion: (question: Question) => {},
    removeGraveyardQuestionById: (questionId: string) => {},
    resetProgress: () => {},
};

const ProgressContext = React.createContext<ProgressContextState>(defaultState);

export default ProgressContext;
