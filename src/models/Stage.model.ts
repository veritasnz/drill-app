import Level from "./Level.model";

interface Stage {
    id: string;
    name: string;
    difficulty: string;
    levels: Level[];
}

export default Stage;
