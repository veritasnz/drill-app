import drillData from "../data/drillData";

import Question from "../models/Question.model";

/**
 * @param answeredQuestionIds
 * @param levelQuestions
 * @returns {Question[]}
 */
export const getAnsweredQuestionsInLevel = (
    answeredQuestionIds: string[],
    levelQuestions: Question[]
) => {
    const answeredQuestions: Question[] = [];

    levelQuestions.forEach((levelQuestion) => {
        const questionIsAnswered = answeredQuestionIds.find(
            (answeredQuestionId) => levelQuestion.id === answeredQuestionId
        );

        if (questionIsAnswered) answeredQuestions.push(levelQuestion);
    });

    return answeredQuestions;
};

/**
 * @param answeredQuestionIds
 * @param levelQuestions
 * @returns {Question[]}
 */
export const getUnansweredQuestionsInLevel = (
    answeredQuestionIds: string[],
    levelQuestions: Question[]
) => {
    const unansweredQuestions: Question[] = [];

    levelQuestions.forEach((levelQuestion) => {
        const questionIsAnswered = answeredQuestionIds.find(
            (answeredQuestionId) => levelQuestion.id === answeredQuestionId
        );

        if (!questionIsAnswered) unansweredQuestions.push(levelQuestion);
    });

    return unansweredQuestions;
};

/**
 * @returns {Question[]}
 */
export const getAllQuestions: () => Question[] = () => {
    const allQuestions: Question[] = [];

    drillData.forEach((stage) => {
        stage.levels.forEach((level) => {
            level.questions.forEach((question) => {
                allQuestions.push(question);
            });
        });
    });

    return allQuestions;
};
