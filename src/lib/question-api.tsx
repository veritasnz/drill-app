import Question from "../models/Question.model";

export const getUnansweredQuestionsInLevel = (
    answeredQuestionIds: string[],
    levelQuestions: Question[]
) => {
    const unansweredQuestions: Question[] = [];

    levelQuestions.forEach((levelQuestion) => {
        const questionIsAnswered = answeredQuestionIds.find(
            (answeredQuestionId) => levelQuestion.id === answeredQuestionId
        );

        if (!questionIsAnswered) {
            unansweredQuestions.push(levelQuestion);
        }
    });

    return unansweredQuestions;
};
