import React, { useState, useEffect } from "react";
import Question from "../models/Question.model";

import ProgressContext from "./progress-context";

/** Stats Local Storage Keys */
enum LSKey {
    QUESTIONS_ANSWERED = "questions_answered",
    LEVEL_KEY = "current_level_id",
    GRAVEYARD_QUESTIONS = "graveyard_questions",
}

const INITIAL_LEVEL_ID = "yajirobe";

const ProgressContextProvider: React.FC = (props) => {
    const [answeredQuestionsIds, setAnsweredQuestionsIds] = useState<string[]>(
        []
    );
    const [currentLevelId, setCurrentLevelId] = useState(INITIAL_LEVEL_ID);
    const [graveyard, setGraveyard] = useState<Question[]>([]);

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
        setCurrentLevelId(level);
        localStorage.setItem(LSKey.LEVEL_KEY, level);
    };

    const addGraveyardQuestion = (question: Question) => {
        setGraveyard((prevState) => {
            const newGraveyard = prevState.concat(question);
            localStorage.setItem(
                LSKey.GRAVEYARD_QUESTIONS,
                JSON.stringify(newGraveyard)
            );
            return newGraveyard;
        });
    };

    const removeGraveyardQuestionById = (questionId: string) => {
        setGraveyard((prevState) => {
            const newGraveyard = prevState.filter(
                (currQuestion) => currQuestion.id !== questionId
            );
            localStorage.setItem(
                LSKey.GRAVEYARD_QUESTIONS,
                JSON.stringify(newGraveyard)
            );
            return newGraveyard;
        });
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

        // Load graveyard
        const storedGraveyardJSON = localStorage.getItem(
            LSKey.GRAVEYARD_QUESTIONS
        );
        if (storedGraveyardJSON) {
            setGraveyard(JSON.parse(storedGraveyardJSON));
        }
    }, []);

    return (
        <ProgressContext.Provider
            value={{
                answeredQuestionsIds,
                addAnsweredQuestionId,
                removeAnsweredQuestionsIds,
                currentLevelId,
                setLevelId,
                graveyard,
                addGraveyardQuestion,
                removeGraveyardQuestionById,
            }}
        >
            {props.children}
        </ProgressContext.Provider>
    );
};

export default ProgressContextProvider;
