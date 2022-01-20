import ParticleEnum from "../models/ParticleEnum.model";

export const checkAnswerIsCorrect: (
    inputtedAnswer: ParticleEnum,
    correctAnswers: ParticleEnum[]
) => boolean = (
    inputtedAnswer: ParticleEnum,
    correctAnswers: ParticleEnum[]
) => {
    return !correctAnswers.every((correctAnswer) => {
        return correctAnswer !== inputtedAnswer;
    });
};
