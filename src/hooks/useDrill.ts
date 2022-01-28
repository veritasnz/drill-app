import { useEffect, useState } from "react";

import Question from "../models/Question.model";
import Level from "../models/Level.model";

import { ProgressContextState } from "../context/progress-context";

import {
    getLevelById,
    getLevelNumber,
    getNextLevelById,
} from "../lib/level-api.tsx";
import { getUnansweredQuestionsInLevel } from "../lib/question-api";

export interface DrillStateType {
    nextQuestion: Question;
    questions: Question[];
    currentLevel: Level;
    currentLevelNum: number;
}

type UseDrill = (progressCtx: ProgressContextState) => {
    drillState: DrillStateType;
    correctAnswerHandler: () => void;
    incorrectAnswerHandler: () => void;
};

const BLANK_LEVEL: Level = {
    id: "",
    name: "",
    questions: [],
};

const buildGraveyard: (graveyard: Question[]) => Level = (
    graveyard: Question[]
) => {
    return {
        id: "GRAVEYARD",
        name: "Graveyard",
        questions: graveyard,
    };
};

const useDrill: UseDrill = (progressCtx) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentLevel, setCurrentLevel] = useState<Level>(BLANK_LEVEL);
    const [currentLevelNum, setCurrentLevelNum] = useState<number>(0);

    // On level change / init
    useEffect(() => {
        if (progressCtx.currentLevelId !== "GRAVEYARD") {
            // Get current level
            const newCtxLevel = getLevelById(progressCtx.currentLevelId);

            if (newCtxLevel) {
                setCurrentLevelNum(getLevelNumber(newCtxLevel.id));

                // Check if unanswered questions in level
                const nextQuestions = getUnansweredQuestionsInLevel(
                    progressCtx.answeredQuestionsIds,
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
        } else {
            // Graveyard set
            setQuestions(progressCtx.graveyard);
            setCurrentLevel(buildGraveyard(progressCtx.graveyard));
        }
    }, [progressCtx.currentLevelId]);

    const correctAnswerHandler = () => {
        // Add answered question to context + localStorage
        const answeredQuestionId = questions[0].id;
        progressCtx.addAnsweredQuestionId(answeredQuestionId);

        // Clone current questions, and remove answered
        let newQuestions = [...questions];
        newQuestions.shift();

        if (progressCtx.currentLevelId === "GRAVEYARD") {
            progressCtx.removeGraveyardQuestionById(answeredQuestionId);
        } else {
            // Temp store of currentLevelId. To be updated with new level
            let newCurrentLevelId = progressCtx.currentLevelId;

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

    const incorrectAnswerHandler = () => {
        progressCtx.addGraveyardQuestion(questions[0]);
    };

    return {
        drillState: {
            nextQuestion: questions[0],
            questions,
            currentLevel,
            currentLevelNum,
        },
        correctAnswerHandler,
        incorrectAnswerHandler,
    };
};

export default useDrill;
