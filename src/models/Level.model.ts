import Question from "./Question.model";

interface Level {
    id: string | "GRAVEYARD";
    name: string;
    questions: Question[];
}

export default Level;
