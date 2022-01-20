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

// export const getNextQuestionsInLevel: (
//     answeredQuestionIds: string[],
//     levelId?: string
// ) => Question[] | null = (answeredQuestionIds: string[], levelId?: string) => {
//     let questionReturn: Question | null = null;

//     if (levelId) {
//         drillData.every((stage) => {
//             const levelFound = stage.levels.find(
//                 (level) => level.id === levelId
//             );

//             if (levelFound) {
//                 questionReturn = findUnansweredQuestionInLevel(
//                     answeredQuestionIds,
//                     levelFound.questions
//                 );
//             }

//             return true;
//         });
//     }

//     console.log(questionReturn);
//     return questionReturn;
// };

// export const getQuestion: (questionId: string) => Question = (
//     questionId: string
// ) => {
//     return {
//         id: "DUMMY",
//         question: "DUMMY",
//         answer: ParticleEnum.WO,
//         english: "DUMMY",
//     };
// };
