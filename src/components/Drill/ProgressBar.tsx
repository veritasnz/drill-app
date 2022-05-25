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

const INITIAL_STATE: ProgressBarT = {
    isGraveyard: false,
    lvlNum: null,
    lvlTitle: "",
    questionIndex: 0,
};

const GRAVEYARD_STATE: ProgressBarT = {
    isGraveyard: true,
    lvlNum: null,
    lvlTitle: "",
    questionIndex: 0,
};

import s from "./Drill.module.scss";

const ProgressBar: React.FC<Props> = ({ drillState: ds }) => {
    const [lvlProgress, setLvlProgress] = useState<ProgressBarT>(INITIAL_STATE);

    /**
     * Initiate progress bar state & update when level changes
     */
    useEffect(() => {
        if (ds.currentLevel.id === "GRAVEYARD") {
            setLvlProgress(GRAVEYARD_STATE);
        } else {
            const newLvlProgress: ProgressBarT = {
                isGraveyard: false,
                lvlNum: ds.currentLevelNum,
                lvlTitle: ds.currentLevel.name,
                questionIndex: ds.currentLevel.questions.length, // fallback
            };

            // If level hasn't been finished
            if (ds.question) {
                // Loop until question index
                let newQuestionIndex = 0;
                ds.currentLevel.questions.every((question, index) => {
                    newQuestionIndex = index;

                    if (ds.question.id === question.id) return false;

                    return true;
                });

                newLvlProgress.questionIndex = newQuestionIndex;
            }

            setLvlProgress(newLvlProgress);
        }
    }, [ds.currentLevel, ds.currentLevelNum, ds.question]);

    /**
     * Update progress bar state when drill changes to 'postAnswer' state
     */
    useEffect(() => {
        if (ds.isPostAnswer) {
            setLvlProgress((prevState) => {
                return {
                    ...prevState,
                    questionIndex: lvlProgress.questionIndex + 1,
                };
            });
        }
    }, [ds.isPostAnswer]);

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
