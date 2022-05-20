import Question from "./Question.model";

export type LevelIDType = string | "GRAVEYARD";

export interface Level {
    id: LevelIDType;
    name: string;
    questions: Question[];
}
