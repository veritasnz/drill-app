import ParticleEnum from "../models/ParticleEnum.model";

/**
 * Checks if particle exists (`inputtedAnswer`) within accepted particles array (`correctAnswers`).
 * Returns boolean representing if the answer is true or false
 * @param inputtedAnswer
 * @param correctAnswers
 * @returns {boolean}
 */
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
