import Question from "./Question.model";

interface Level {
    id: string;
    name: string;
    questions: Question[];
}

export default Level;
