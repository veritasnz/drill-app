import React, { useState, useEffect } from "react";

// Models
import Question from "../models/Question.model";
import LSKeyEnum from "../models/LocalStorageKeyEnum.model";

// API
import { getLevelNum } from "../lib/level-api";

// Context component
import ProgressContext from "./progress-context";

const INITIAL_LEVEL_ID = "yajirobe";

const ProgressContextProvider: React.FC = (props) => {
    const [answeredQuestionIds, setAnsweredQuestionsIds] = useState<string[]>(
        []
    );
    const [currentLevelId, setCurrentLevelId] = useState("");
    const [currentLevelNum, setCurrentLevelNum] = useState(-1);
    const [graveyard, setGraveyard] = useState<Question[]>([]);

    const addAnsweredQuestionId = (questionId: string) => {
        setAnsweredQuestionsIds((prevState) => {
            const newAnsweredQuestionIds = [...prevState];

            // Check if question already exists. If non-existent, add
            const questionExists = newAnsweredQuestionIds.find(
                (currentQuestionId) => currentQuestionId === questionId
            );
            if (!questionExists) newAnsweredQuestionIds.push(questionId);

            // Set local storage
            localStorage.setItem(
                LSKeyEnum.PROGRESS_ANSWERED_QS,
                JSON.stringify(newAnsweredQuestionIds)
            );

            return newAnsweredQuestionIds;
        });
    };

    const removeAnsweredQuestionsIds = (questions: string[]) => {
        setAnsweredQuestionsIds((prevState) => {
            let newAnsweredQuestionIds = prevState;

            // Loop through answeredQuestionIds and filter out ones to remove
            questions.forEach((idToRemove) => {
                newAnsweredQuestionIds = newAnsweredQuestionIds.filter(
                    (item) => item !== idToRemove
                );
            });

            // Update local storage
            localStorage.setItem(
                LSKeyEnum.PROGRESS_ANSWERED_QS,
                JSON.stringify(newAnsweredQuestionIds)
            );

            return newAnsweredQuestionIds;
        });
    };

    const setLevelId = (levelId: string) => {
        // Update currentLevelId & currentLevelNum
        setCurrentLevelId(levelId);
        setCurrentLevelNum(getLevelNum(levelId));

        // Update local storage
        localStorage.setItem(LSKeyEnum.PROGRESS_CURR_LVL, levelId);
    };

    const addGraveyardQuestion = (question: Question) => {
        setGraveyard((prevState) => {
            const alreadyExists = prevState.find((graveQuestion) => {
                return graveQuestion.id.match(question.id);
            });

            if (alreadyExists) {
                return prevState; // do nothing
            } else {
                // Add to graveyard
                const newGraveyard = prevState.concat(question);

                // Update local storage
                localStorage.setItem(
                    LSKeyEnum.PROGRESS_GRAVEYARD_QS,
                    JSON.stringify(newGraveyard)
                );

                return newGraveyard;
            }
        });
    };

    const removeGraveyardQuestionById = (questionId: string) => {
        setGraveyard((prevState) => {
            // Remove question from graveyard
            const newGraveyard = prevState.filter(
                (currQuestion) => currQuestion.id !== questionId
            );

            // Update local storage
            localStorage.setItem(
                LSKeyEnum.PROGRESS_GRAVEYARD_QS,
                JSON.stringify(newGraveyard)
            );

            return newGraveyard;
        });
    };

    const resetProgress = () => {
        // Clear graveyard
        graveyard.forEach((question) => {
            removeGraveyardQuestionById(question.id);
        });

        // Clear all answeredQuestionIds
        removeAnsweredQuestionsIds(answeredQuestionIds);

        // Reset level
        setLevelId(INITIAL_LEVEL_ID);
    };

    // Initialize context & load from local storage
    useEffect(() => {
        // Set current level ID from storage if it exists, else initialise
        const storedLevelId = localStorage.getItem(LSKeyEnum.PROGRESS_CURR_LVL);
        if (storedLevelId) {
            setLevelId(storedLevelId);
        } else {
            setLevelId(INITIAL_LEVEL_ID);
        }

        // Load questions
        const storedAnsweredQuestionIdsJSON = localStorage.getItem(
            LSKeyEnum.PROGRESS_ANSWERED_QS
        );
        if (storedAnsweredQuestionIdsJSON) {
            setAnsweredQuestionsIds(JSON.parse(storedAnsweredQuestionIdsJSON));
        }

        // Load graveyard
        const storedGraveyardJSON = localStorage.getItem(
            LSKeyEnum.PROGRESS_GRAVEYARD_QS
        );
        if (storedGraveyardJSON) {
            setGraveyard(JSON.parse(storedGraveyardJSON));
        }
    }, []);

    return (
        <ProgressContext.Provider
            value={{
                state: {
                    answeredQuestionIds,
                    currentLevelId,
                    currentLevelNum,
                    graveyard,
                },
                addAnsweredQuestionId,
                removeAnsweredQuestionsIds,
                setLevelId,
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
