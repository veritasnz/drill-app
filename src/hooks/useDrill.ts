import { useEffect, useState } from "react";

import Question from "../models/Question.model";

import { ProgressContextState } from "../context/progress-context";

import { getLevelById, getNextLevelById } from "../lib/level-api";
import { getUnansweredQuestionsInLevel } from "../lib/question-api";

type UseDrill = (progressCtx: ProgressContextState) => {
    nextQuestion: Question;
    correctAnswerHandler: () => void;
    incorrectAnswerHandler: () => void;
};

const useDrill: UseDrill = (progressCtx) => {
    const [questions, setQuestions] = useState<Question[]>([]);

    // On level change / init
    useEffect(() => {
        if (progressCtx.currentLevelId !== "GRAVEYARD") {
            // Get current level
            const currentLevel = getLevelById(progressCtx.currentLevelId);

            if (currentLevel) {
                // Check if unanswered questions in level
                const nextQuestions = getUnansweredQuestionsInLevel(
                    progressCtx.answeredQuestionsIds,
                    currentLevel.questions
                );

                if (nextQuestions.length > 0) {
                    // If questions in current level, set questions
                    setQuestions(nextQuestions);
                } else {
                    // Else, set questionsCtx level ID to next
                    // thus triggering this useEffect again
                    const nextLevel = getNextLevelById(currentLevel.id);

                    if (nextLevel) {
                        // If there is another level
                        progressCtx.setLevelId(nextLevel.id);
                    } else {
                        // Else final level, display "no more levels" screen
                        setQuestions([]);
                    }
                }
            }
        } else {
            // Graveyard get
            setQuestions(progressCtx.graveyard);
        }
    }, [progressCtx.answeredQuestionsIds]);

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
        nextQuestion: questions[0],
        correctAnswerHandler,
        incorrectAnswerHandler,
    };
};

export default useDrill;
