import { useEffect, useState } from "react";

import Level from "../../models/Level.model";

import { getLevelWithNumber } from "../../lib/level-api";

import { ProgressContextState } from "../../context/progress-context";

import s from "./Drill.module.scss";

interface Props {
    context: ProgressContextState;
}

const BLANK_LEVEL: Level = {
    id: "",
    name: "",
    questions: [],
};

const LevelProgress: React.FC<Props> = ({ context }) => {
    const [currentLevel, setCurrentLevel] = useState<Level>(BLANK_LEVEL);
    const [currentLevelNum, setCurrentLevelNum] = useState<number>(0);

    // On initialize
    useEffect(() => {
        const { level, number } = getLevelWithNumber(context.currentLevelId);

        if (level) setCurrentLevel(level);
        if (number) setCurrentLevelNum(number);
    }, [context.currentLevelId]);

    const titleText = `Lv. ${currentLevelNum + 1} - ${
        currentLevel.name || "No level name"
    }`;

    const progressText = `${69} / ${currentLevel.questions.length}`;

    return (
        <header className={s["level-progress"]}>
            <div>{titleText}</div>
            <div>progress bar</div>
            <div>{progressText}</div>
        </header>
    );
};

export default LevelProgress;
