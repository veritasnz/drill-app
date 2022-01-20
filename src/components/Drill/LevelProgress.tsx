import { useEffect, useState } from "react";
import { SettingsContextState } from "../../context/settings-context";
import { getLevelWithNumber } from "../../lib/level-api";

import Level from "../../models/Level.model";

import s from "./Drill.module.scss";

interface Props {
    settingsCtx: SettingsContextState;
}

const BLANK_LEVEL: Level = {
    id: "",
    name: "",
    questions: [],
};

const LevelProgress: React.FC<Props> = ({ settingsCtx }) => {
    const [currentLevel, setCurrentLevel] = useState<Level>(BLANK_LEVEL);
    const [currentLevelNum, setCurrentLevelNum] = useState<number>(0);

    // On initialize
    useEffect(() => {
        const { level, number } = getLevelWithNumber(
            settingsCtx.currentLevelId
        );

        if (level) setCurrentLevel(level);
        if (number) setCurrentLevelNum(number);
    }, [settingsCtx.currentLevelId]);

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
