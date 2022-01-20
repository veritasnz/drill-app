import { useEffect, useState } from "react";

import Question from "../models/Question.model";

import { SettingsContextState } from "../context/settings-context";
import { StatsContextState } from "../context/stats-context";
import { QuestionHistoryContextState } from "../context/question-history-context";

import { getLevelById, getNextLevelById } from "../lib/level-api";
import { getUnansweredQuestionsInLevel } from "../lib/question-api";

type UseDrill = (
    settingsCtx: SettingsContextState,
    questionsCtx: QuestionHistoryContextState
) => {
    nextQuestion: Question;
    correctAnswerHandler: () => void;
};

const useDrill: UseDrill = (settingsCtx, questionsCtx) => {
    const [questions, setQuestions] = useState<Question[]>([]);

    // On level change / init
    useEffect(() => {
        // Get current level
        const currentLevel = getLevelById(settingsCtx.currentLevelId);

        if (currentLevel) {
            // Check if unanswered questions in level
            const nextQuestions = getUnansweredQuestionsInLevel(
                questionsCtx.answeredQuestions,
                currentLevel.questions
            );

            if (nextQuestions.length > 0) {
                // If questions in current level, set questions
                setQuestions(nextQuestions);
            } else {
                // Else, set settingsCtx level ID to next
                // thus triggering this useEffect again
                const nextLevel = getNextLevelById(currentLevel.id);

                if (nextLevel) {
                    // If there is another level
                    settingsCtx.setLevelId(nextLevel.id);
                } else {
                    // Else final level, display "no more levels" screen
                    setQuestions([]);
                }
            }
        }
    }, [settingsCtx.currentLevelId]);

    const correctAnswerHandler = () => {
        // Add answered question to context + localStorage
        questionsCtx.addAnsweredQuestionId(questions[0].id);

        // Clone current questions, and remove answered
        let newQuestions = [...questions];
        newQuestions.shift();

        // Temp store of currentLevelId, to remove overuse of context
        let newCurrentLevelId = settingsCtx.currentLevelId;

        // If no new questions
        if (newQuestions.length === 0) {
            const nextLevel = getNextLevelById(newCurrentLevelId);

            if (nextLevel) {
                // Set next level and add new questions
                newCurrentLevelId = nextLevel.id;
                settingsCtx.setLevelId(nextLevel.id);
                newQuestions = newQuestions.concat(nextLevel.questions);
            }
        }

        setQuestions(newQuestions);
    };

    return {
        nextQuestion: questions[0],
        correctAnswerHandler,
    };
};

export default useDrill;
