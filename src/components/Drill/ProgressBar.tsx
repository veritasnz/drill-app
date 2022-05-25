import { useEffect, useState } from "react";
import { DrillStateType } from "../../hooks/useDrill";

interface Props {
    drillState: DrillStateType;
}

interface ProgressBarT {
    isGraveyard: boolean;
    lvlNum: number | null;
    lvlTitle: string;
    questionIndex: number;
}

import s from "./Drill.module.scss";

const ProgressBar: React.FC<Props> = ({ drillState: ds }) => {
    const [lvlProgress, setLvlProgress] = useState<ProgressBarT>({
        isGraveyard: false,
        lvlNum: null,
        lvlTitle: "",
        questionIndex: 0,
    });

    useEffect(() => {
        if (ds.currentLevel.id === "GRAVEYARD") {
            // Set graveyard
            setLvlProgress((prevState) => {
                return {
                    ...prevState,
                    isGraveyard: true,
                };
            });
        } else {
            // Loop until question index
            let newQuestionIndex = 0;
            ds.currentLevel.questions.every((question, index) => {
                newQuestionIndex = index;

                if (!ds.question) {
                    return false;
                } else if (ds.question.id === question.id) {
                    return false;
                }

                return true;
            });

            // Set graveyard
            setLvlProgress({
                isGraveyard: false,
                lvlNum: ds.currentLevelNum,
                lvlTitle: ds.currentLevel.name,
                questionIndex: newQuestionIndex,
            });
        }
    }, [ds.currentLevel, ds.currentLevelNum, ds.question]);

    return (
        <header className={s["progress-bar"]}>
            <div className={s["progress-bar__lvl"]}>
                {lvlProgress.isGraveyard ? (
                    <>Graveyard</>
                ) : (
                    <>
                        <em>Lv.{lvlProgress.lvlNum}</em>
                        <small>{lvlProgress.lvlTitle}</small>
                    </>
                )}
            </div>
            <div className={s["progress-bar__bar-wrap"]}>
                <span
                    style={{
                        width: `${
                            (lvlProgress.questionIndex /
                                ds.currentLevel.questions.length) *
                            100
                        }%`,
                    }}
                    className={s["progress-bar__bar"]}
                ></span>
            </div>
            <div className={s["progress-bar__prog"]}>
                {`${lvlProgress.questionIndex} / ${ds.currentLevel.questions.length}`}
            </div>
        </header>
    );
};

export default ProgressBar;
