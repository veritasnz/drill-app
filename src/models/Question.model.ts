import ParticleEnum from "./ParticleEnum.model";

interface Question {
    id: string;
    question: string;
    answers: ParticleEnum[];
    english: string;
}

export default Question;
