import React, { useState, useEffect } from "react";

// Models
import Question from "../models/Question.model";

// Context component
import ProgressContext from "./progress-context";

/** Stats Local Storage Keys */
enum LSKey {
    QUESTIONS_ANSWERED = "questions_answered",
    LEVEL_KEY = "current_level_id",
    GRAVEYARD_QUESTIONS = "graveyard_questions",
}

const INITIAL_LEVEL_ID = "yajirobe";

const ProgressContextProvider: React.FC = (props) => {
    const [answeredQuestionIds, setAnsweredQuestionsIds] = useState<string[]>(
        []
    );
    const [currentLevelId, setCurrentLevelId] = useState("");
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
            const alreadyExists = prevState.find((graveQuestion) => {
                return graveQuestion.id.match(question.id);
            });

            if (alreadyExists) {
                return prevState;
            } else {
                const newGraveyard = prevState.concat(question);
                localStorage.setItem(
                    LSKey.GRAVEYARD_QUESTIONS,
                    JSON.stringify(newGraveyard)
                );
                return newGraveyard;
            }
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
        // Set current level ID from storage if it exists, else initialise
        const storedLevelId = localStorage.getItem(LSKey.LEVEL_KEY);
        if (storedLevelId) {
            setLevelId(storedLevelId);
        } else {
            setLevelId(INITIAL_LEVEL_ID);
        }

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

    const resetProgress = () => {
        // Clear graveyard
        graveyard.forEach((question) => {
            removeGraveyardQuestionById(question.id);
        });

        // Clear answeredQuestionIds
        removeAnsweredQuestionsIds(answeredQuestionIds);

        // Reset level
        setLevelId(INITIAL_LEVEL_ID);
    };

    return (
        <ProgressContext.Provider
            value={{
                answeredQuestionIds,
                addAnsweredQuestionId,
                removeAnsweredQuestionsIds,
                currentLevelId,
                setLevelId,
                graveyard,
                addGraveyardQuestion,
                removeGraveyardQuestionById,
                resetProgress,
            }}
        >
            {props.children}
        </ProgressContext.Provider>
    );
};

export default ProgressContextProvider;
