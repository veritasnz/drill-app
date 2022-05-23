import { DrillStateType } from "../../hooks/useDrill";

import s from "./Drill.module.scss";

interface Props {
    drillState: DrillStateType;
}

const LevelProgress: React.FC<Props> = ({ drillState }) => {
    let titleLvl: number | false = false;
    let titleText: string;
    let progressText: string;
    let progressPercent = 0;

    if (drillState.currentLevel.id === "GRAVEYARD") {
        titleText = drillState.currentLevel.name;
        progressText = `Remaining: ${drillState.currentLevel.questions.length}`;
    } else {
        // Loop until question index
        let questionIndex = 0;
        drillState.currentLevel.questions.every((question, index) => {
            questionIndex = index;
            if (drillState.nextQuestion.id === question.id) {
                return false;
            }

            return true;
        });

        // Calculate progressPercent
        progressPercent =
            (questionIndex / drillState.currentLevel.questions.length) * 100;
        titleLvl = drillState.currentLevelNum + 1;
        titleText = drillState.currentLevel.name;

        // Form progressText
        progressText = `${questionIndex} / ${drillState.currentLevel.questions.length}`;
    }

    return (
        <header className={s["level-progress"]}>
            <div className={s["level-progress__lvl"]}>
                {titleLvl && <em>Lv.{titleLvl}</em>}
                <small>{titleText}</small>
            </div>
            <div className={s["level-progress__bar-wrap"]}>
                <span
                    style={{ width: `${progressPercent}%` }}
                    className={s["level-progress__bar"]}
                ></span>
            </div>
            <div className={s["level-progress__prog"]}>{progressText}</div>
        </header>
    );
};

export default LevelProgress;
