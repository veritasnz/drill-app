import { useEffect, useState } from "react";

import Level from "../../models/Level.model";

import { getLevelWithNumber } from "../../lib/level-api";

import { ProgressContextState } from "../../context/progress-context";

import s from "./Drill.module.scss";
import Question from "../../models/Question.model";

interface Props {
    nextQuestionId: string;
    progressCtx: ProgressContextState;
}

const BLANK_LEVEL: Level = {
    id: "",
    name: "",
    questions: [],
};

const buildGraveyard: (graveyard: Question[]) => Level = (
    graveyard: Question[]
) => {
    return {
        id: "GRAVEYARD",
        name: "Graveyard",
        questions: graveyard,
    };
};

const LevelProgress: React.FC<Props> = ({ nextQuestionId, progressCtx }) => {
    const [currentLevel, setCurrentLevel] = useState<Level>(BLANK_LEVEL);
    const [currentLevelNum, setCurrentLevelNum] = useState<number>(0);

    // On initialize
    useEffect(() => {
        if (progressCtx.currentLevelId !== "GRAVEYARD") {
            // Level
            const { level, number } = getLevelWithNumber(
                progressCtx.currentLevelId
            );

            if (level) setCurrentLevel(level);
            if (number) setCurrentLevelNum(number);
        } else {
            // Graveyard
            setCurrentLevel(buildGraveyard(progressCtx.graveyard));
            setCurrentLevelNum(-1);
        }
    }, [progressCtx.currentLevelId]);

    let titleText = `${currentLevel.name}`;

    if (currentLevel.id !== "GRAVEYARD") {
        titleText = `Lv. ${currentLevelNum + 1} - ${titleText}`;
    }

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
