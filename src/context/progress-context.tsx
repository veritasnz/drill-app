import React from "react";
import Question from "../models/Question.model";

/*
 * Context
 */

export interface ProgressContextState {
    answeredQuestionsIds: string[];
    addAnsweredQuestionId: (questionId: string) => void;
    removeAnsweredQuestionsIds: (questionIds: string[]) => void;
    currentLevelId: string;
    setLevelId: (levelId: string) => void;
    graveyard: Question[];
    addGraveyardQuestion: (question: Question) => void;
    removeGraveyardQuestionById: (questionId: string) => void;
}

const defaultState: ProgressContextState = {
    answeredQuestionsIds: [],
    addAnsweredQuestionId: (questionIds: string) => {},
    removeAnsweredQuestionsIds: (questionIds: string[]) => {},
    currentLevelId: "",
    setLevelId: (levelId: string) => {},
    graveyard: [],
    addGraveyardQuestion: (question: Question) => {},
    removeGraveyardQuestionById: (questionId: string) => {},
};

const ProgressContext = React.createContext<ProgressContextState>(defaultState);

export default ProgressContext;
