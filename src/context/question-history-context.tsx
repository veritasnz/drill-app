import React from "react";

/*
 * Context
 */

export interface QuestionHistoryContextState {
    answeredQuestions: string[];
    addAnsweredQuestionId: (questionId: string) => void;
    removeAnsweredQuestionsIds: (questionIds: string[]) => void;
}

const defaultState: QuestionHistoryContextState = {
    answeredQuestions: [],
    addAnsweredQuestionId: (questionIds: string) => {},
    removeAnsweredQuestionsIds: (questionIds: string[]) => {},
};

const QuestionHistoryContext =
    React.createContext<QuestionHistoryContextState>(defaultState);

export default QuestionHistoryContext;
