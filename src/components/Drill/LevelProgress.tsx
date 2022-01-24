import { useEffect, useState } from "react";

import { getLevelNumber } from "../../lib/level-api";

import s from "./Drill.module.scss";
import { DrillStateType } from "../../hooks/useDrill";

interface Props {
    drillState: DrillStateType;
}

const LevelProgress: React.FC<Props> = ({ drillState }) => {
    let titleText = ``;
    let progressText = ``;
    let progressPercent = 0;

    if (drillState.currentLevel.id === "GRAVEYARD") {
        titleText = drillState.currentLevel.name;
        progressText = `Remaining questions: ${drillState.currentLevel.questions.length}`;
    } else {
        let questionIndex = 0;
        drillState.currentLevel.questions.every((question, index) => {
            questionIndex = index;
            if (drillState.nextQuestion.id === question.id) {
                return false;
            }

            return true;
        });

        progressPercent =
            (questionIndex / drillState.currentLevel.questions.length) * 100;
        titleText = `Lv. ${drillState.currentLevelNum + 1} - ${
            drillState.currentLevel.name
        }`;
        progressText = `${questionIndex} / ${drillState.currentLevel.questions.length}`;
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
