import React, { useState, useEffect } from "react";

import QuestionHistoryContext from "./question-history-context";

/** Stats Local Storage Keys */
enum LSKey {
    QUESTIONS_ANSWERED = "questions_answered",
}

const QuestionHistoryContextProvider: React.FC = (props) => {
    const [answeredQuestionsIds, setAnsweredQuestionsIds] = useState<string[]>(
        []
    );

    const addAnsweredQuestionId = (questionId: string) => {
        setAnsweredQuestionsIds((prevState) => {
            const newAnsweredQuestionIds = [...prevState];

            // Test if question already exists
            const questionExists = newAnsweredQuestionIds.find(
                (currentQuestionId) => currentQuestionId === questionId
            );
            if (!questionExists) {
                newAnsweredQuestionIds.push(questionId);
            }

            // Set local storage
            localStorage.setItem(
                LSKey.QUESTIONS_ANSWERED,
                JSON.stringify(newAnsweredQuestionIds)
            );

            return newAnsweredQuestionIds;
        });
    };

    const removeAnsweredQuestionsIds = (questions: string[]) => {
        setAnsweredQuestionsIds((prevState) => {
            let newAnsweredQuestionIds = prevState;

            questions.forEach((idToRemove) => {
                newAnsweredQuestionIds = newAnsweredQuestionIds.filter(
                    (item) => item !== idToRemove
                );
            });

            // Set local storage
            localStorage.setItem(
                LSKey.QUESTIONS_ANSWERED,
                JSON.stringify(newAnsweredQuestionIds)
            );

            return newAnsweredQuestionIds;
        });
    };

    // Initialize
    useEffect(() => {
        const storedAnsweredQuestionIdsJSON = localStorage.getItem(
            LSKey.QUESTIONS_ANSWERED
        );

        if (storedAnsweredQuestionIdsJSON) {
            setAnsweredQuestionsIds(JSON.parse(storedAnsweredQuestionIdsJSON));
        }
    }, []);

    return (
        <QuestionHistoryContext.Provider
            value={{
                answeredQuestions: answeredQuestionsIds,
                addAnsweredQuestionId,
                removeAnsweredQuestionsIds,
            }}
        >
            {props.children}
        </QuestionHistoryContext.Provider>
    );
};

export default QuestionHistoryContextProvider;
