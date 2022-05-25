import { useEffect, useState } from "react";

// Models / type imports
import Question from "../models/Question.model";
import { Level } from "../models/Level.model";
import { ProgressContextState } from "../context/progress-context";

// API
import {
    getLevelById,
    getLevelIndex,
    getNextLevelById,
} from "../lib/level-api";
import { getUnansweredQuestionsInLevel } from "../lib/question-api";

// Local type declarations
export interface DrillStateType {
    nextQuestion: Question;
    questions: Question[];
    currentLevel: Level;
    currentLevelNum: number;
}

type UseDrillReturnType = {
    state: DrillStateType;
    correctHandler: () => void;
    incorrectHandler: () => void;
};

// Local constant declarations
const BLANK_LEVEL: Level = {
    id: "",
    name: "",
    questions: [],
};

// Local helper function declarations
const buildGraveyard: (graveyard: Question[]) => Level = (
    graveyard: Question[]
) => {
    return {
        id: "GRAVEYARD",
        name: "Graveyard",
        questions: graveyard,
    };
};

/**
 * Controls the state of the drill, and provides methods to progress the state of the drill.
 *
 * @param {ProgressContextState} progressCtx
 * @returns {UseDrillReturnType} { state, correctHandler, incorrectHandler }
 */
const useDrill: (progressCtx: ProgressContextState) => UseDrillReturnType = (
    progressCtx
) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentLevel, setCurrentLevel] = useState<Level>(BLANK_LEVEL);
    const [currentLevelNum, setCurrentLevelNum] = useState<number>(0);

    // On level change / init
    useEffect(() => {
        if (progressCtx.state.currentLevelId === "GRAVEYARD") {
            // If Graveyard, set
            setQuestions(progressCtx.state.graveyard);
            setCurrentLevel(buildGraveyard(progressCtx.state.graveyard));
        } else {
            // Else, get current level
            const newCtxLevel = getLevelById(progressCtx.state.currentLevelId);

            if (newCtxLevel) {
                setCurrentLevelNum(getLevelIndex(newCtxLevel.id));

                // Check if unanswered questions in level
                const nextQuestions = getUnansweredQuestionsInLevel(
                    progressCtx.state.answeredQuestionIds,
                    newCtxLevel.questions
                );

                if (nextQuestions.length > 0) {
                    // If questions in current level, set questions
                    setQuestions(nextQuestions);
                    setCurrentLevel(newCtxLevel);
                } else {
                    // Else, set questionsCtx level ID to next
                    // thus triggering this useEffect again
                    const nextLevel = getNextLevelById(newCtxLevel.id);

                    if (nextLevel) {
                        // If there is another level
                        progressCtx.setLevelId(nextLevel.id);
                        setCurrentLevel(nextLevel);
                    } else {
                        // Else final level, display "no more levels" screen
                        setQuestions([]);
                    }
                }
            }
        }
    }, [progressCtx.state.currentLevelId]);

    const correctHandler = () => {
        // Add answered question to context + localStorage
        const answeredQuestionId = questions[0].id;
        progressCtx.addAnsweredQuestionId(answeredQuestionId);

        // Clone current questions, and remove answered
        let newQuestions = [...questions];
        newQuestions.shift();

        if (progressCtx.state.currentLevelId === "GRAVEYARD") {
            progressCtx.removeGraveyardQuestionById(answeredQuestionId);
        } else {
            // Temp store of currentLevelId. To be updated with new level
            let newCurrentLevelId = progressCtx.state.currentLevelId;

            // If not Graveyard
            if (newQuestions.length === 0) {
                // If no new questions
                const nextLevel = getNextLevelById(newCurrentLevelId);

                if (nextLevel) {
                    // Set next level and add new questions
                    newCurrentLevelId = nextLevel.id;
                    progressCtx.setLevelId(nextLevel.id);
                    newQuestions = newQuestions.concat(nextLevel.questions);
                }
            }
        }

        setQuestions(newQuestions);
    };

    const incorrectHandler = () => {
        progressCtx.addGraveyardQuestion(questions[0]);
    };

    return {
        state: {
            nextQuestion: questions[0],
            questions,
            currentLevel,
            currentLevelNum,
        },
        correctHandler,
        incorrectHandler,
    };
};

export default useDrill;
