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

    let titleText = ``;
    let progressText = ``;
    let progressPercent = 0;

    if (currentLevel.id === "GRAVEYARD") {
        titleText = currentLevel.name;
        progressText = `Remaining questions: ${currentLevel.questions.length}`;
    } else {
        let questionIndex = 0;
        currentLevel.questions.every((question, index) => {
            questionIndex = index;
            if (nextQuestionId === question.id) {
                return false;
            }

            return true;
        });

        progressPercent = (questionIndex / currentLevel.questions.length) * 100;
        titleText = `Lv. ${currentLevelNum + 1} - ${currentLevel.name}`;
        progressText = `${questionIndex} / ${currentLevel.questions.length}`;
    }

    return (
        <header className={s["level-progress"]}>
            <div>{titleText}</div>
            <div className={s["level-progress__bar-wrap"]}>
                <span
                    style={{ width: `${progressPercent}%` }}
                    className={s["level-progress__bar"]}
                ></span>
            </div>
            <div>{progressText}</div>
        </header>
    );
};

export default LevelProgress;
