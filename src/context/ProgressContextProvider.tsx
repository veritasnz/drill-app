import React, { useState, useEffect } from "react";

import ProgressContext from "./progress-context";

/** Stats Local Storage Keys */
enum LSKey {
    LEVEL_KEY = "current_level_id",
    QUESTIONS_ANSWERED = "questions_answered",
}

const INITIAL_LEVEL_ID = "yajirobe";

const ProgressContextProvider: React.FC = (props) => {
    const [currentLevel, setCurrentLevel] = useState(INITIAL_LEVEL_ID);
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

    const setLevelId = (level: string) => {
        setCurrentLevel(level);
        localStorage.setItem(LSKey.LEVEL_KEY, level);
    };

    // Initialize & load from localStorage
    useEffect(() => {
        // Load current level ID
        const storedCurrentLevelId = localStorage.getItem(LSKey.LEVEL_KEY);
        if (storedCurrentLevelId) setLevelId(storedCurrentLevelId);

        // Load questions
        const storedAnsweredQuestionIdsJSON = localStorage.getItem(
            LSKey.QUESTIONS_ANSWERED
        );

        if (storedAnsweredQuestionIdsJSON) {
            setAnsweredQuestionsIds(JSON.parse(storedAnsweredQuestionIdsJSON));
        }
    }, []);

    return (
        <ProgressContext.Provider
            value={{
                answeredQuestions: answeredQuestionsIds,
                addAnsweredQuestionId,
                removeAnsweredQuestionsIds,
                currentLevelId: currentLevel,
                setLevelId: setLevelId,
            }}
        >
            {props.children}
        </ProgressContext.Provider>
    );
};

export default ProgressContextProvider;
