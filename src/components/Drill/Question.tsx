import React from "react";
import { DrillStateType } from "../../hooks/useDrill";
import { rubifyDrillQuestion } from "../../lib/rubify";

import s from "./Drill.module.scss";

interface Props {
    drillState: DrillStateType;
    isTicking: boolean;
}

const Question: React.FC<Props> = ({ drillState, isTicking }) => {
    const { nextQuestion } = drillState;

    let japaneseTextContent = <p>Loading next question</p>;

    if (nextQuestion) {
        const [firstHalf, secondHalf] = rubifyDrillQuestion(
            nextQuestion.question
        );
        japaneseTextContent = (
            <>
                {firstHalf} ＿ {secondHalf}
            </>
        );
    }

    return (
        <div
            className={`${s["question"]} ${
                isTicking && s["question--correct"]
            }`}
        >
            <p className={s["question__text"]}>{japaneseTextContent}</p>
        </div>
    );
};

export default Question;
