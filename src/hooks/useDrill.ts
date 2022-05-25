import { useEffect, useState } from "react";

// Models / type imports
import Question from "../models/Question.model";
import { Level } from "../models/Level.model";
import { ProgressContextState } from "../context/progress-context";

// API
import { getLevelById, getNextLevelById } from "../lib/level-api";
import { getUnansweredQuestionsInLevel } from "../lib/question-api";

// Local type declarations
export interface DrillStateType {
    question: Question;
    questions: Question[];
    currentLevel: Level;
    currentLevelNum: number;
    isPostAnswer: boolean;
}

type UseDrillReturnType = {
    state: DrillStateType;
    correctHandler: () => void;
    incorrectHandler: () => void;
    nextQuestionHandler: () => void;
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
 * @param {ProgressContextState} ctx The progressCtx
 * @returns {UseDrillReturnType} { state, correctHandler, incorrectHandler }
 */
const useDrill: (ctx: ProgressContextState) => UseDrillReturnType = (ctx) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentLevel, setCurrentLevel] = useState<Level>(BLANK_LEVEL);
    const [currentLevelNum, setCurrentLevelNum] = useState<number>(0);
    const [isPostAnswer, setIsPostAnswer] = useState<boolean>(false);

    // On level change / init
    useEffect(() => {
        if (ctx.state.currentLevelId === "GRAVEYARD") {
            // If Graveyard, set
            setQuestions(ctx.state.graveyard);
            setCurrentLevel(buildGraveyard(ctx.state.graveyard));
        } else {
            // Else, get current level
            const newCtxLevel = getLevelById(ctx.state.currentLevelId);

            if (newCtxLevel) {
                setCurrentLevelNum(ctx.state.currentLevelNum);

                // Check if unanswered questions in level
                const nextQuestions = getUnansweredQuestionsInLevel(
                    ctx.state.answeredQuestionIds,
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
                        ctx.setLevelId(nextLevel.id);
                        setCurrentLevel(nextLevel);
                    } else {
                        // Else final level, display "no more levels" screen
                        setQuestions([]);
                    }
                }
            }
        }
    }, [ctx.state.currentLevelId]);

    /**
     * Updates progressContext and localStorage
     */
    const correctHandler = () => {
        // Add answered question to context + localStorage
        const answeredQuestionId = questions[0].id;
        ctx.addAnsweredQuestionId(answeredQuestionId);

        if (ctx.state.currentLevelId === "GRAVEYARD") {
            ctx.removeGraveyardQuestionById(answeredQuestionId);
        }

        setIsPostAnswer(true);
    };

    /**
     * Adds incorrect questions to Graveyard (in context and LS)
     */
    const incorrectHandler = () => {
        ctx.addGraveyardQuestion(questions[0]);
    };

    /**
     * Goes to the next question (only if is in postAnswer phase)
     */
    const nextQuestionHandler = () => {
        if (isPostAnswer) {
            // Clone current questions, and remove answered
            let newQuestions = [...questions];
            newQuestions.shift();

            if (ctx.state.currentLevelId !== "GRAVEYARD") {
                // Temp store of currentLevelId. To be updated with new level
                let newCurrentLevelId = ctx.state.currentLevelId;

                // If not Graveyard
                if (newQuestions.length === 0) {
                    // If no new questions
                    const nextLevel = getNextLevelById(newCurrentLevelId);

                    if (nextLevel) {
                        // Set next level and add new questions
                        newCurrentLevelId = nextLevel.id;
                        ctx.setLevelId(nextLevel.id);
                        newQuestions = newQuestions.concat(nextLevel.questions);
                    }
                }
            }

            setQuestions(newQuestions);
            setIsPostAnswer(false);
        }
    };

    return {
        state: {
            question: questions[0],
            questions,
            currentLevel,
            currentLevelNum,
            isPostAnswer,
        },
        correctHandler,
        incorrectHandler,
        nextQuestionHandler,
    };
};

export default useDrill;
