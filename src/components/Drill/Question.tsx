import React, { useEffect, useState } from "react";
import { DrillStateType } from "../../hooks/useDrill";
import { rubifyDrillQuestion } from "../../lib/rubify";
import Icon from "../UI/Icon/Icon";

import s from "./Drill.module.scss";

interface Props {
    drillState: DrillStateType;
    isTicking: boolean;
}

const Question: React.FC<Props> = ({ drillState, isTicking }) => {
    const { nextQuestion } = drillState;

    const [firstHalf, setFirstHalf] = useState<JSX.Element>(<></>);
    const [secondHalf, setSecondHalf] = useState<JSX.Element>(<></>);
    const [placeholderContent, setPlaceholderContent] = useState<string[]>([]);

    // Update text on question change
    useEffect(() => {
        const [newFirstHalf, newSecondHalf] = rubifyDrillQuestion(
            nextQuestion.question
        );

        setFirstHalf(newFirstHalf);
        setSecondHalf(newSecondHalf);
    }, [nextQuestion]);

    // Update placeholder when ticking
    useEffect(() => {
        if (isTicking) {
            let isFirst = true;
            const newPlaceholderContent = nextQuestion.answers.map((answer) => {
                if (isFirst) {
                    isFirst = false;
                    return answer;
                } else {
                    return `・${answer}`;
                }
            });
            setPlaceholderContent(newPlaceholderContent);
        } else {
            setPlaceholderContent([""]);
        }
    }, [isTicking]);

    return (
        <div className={s["question"]}>
            {nextQuestion ? (
                <>
                    <p className={s["question__text"]}>
                        {firstHalf}
                        <span className={`${s["question__place-wrap"]}`}>
                            <span
                                className={`${s["question__place-inner"]} ${
                                    isTicking &&
                                    s["question__place-inner--correct"]
                                }`}
                            >
                                {placeholderContent}
                            </span>
                        </span>
                        {secondHalf}
                    </p>
                    <i
                        className={`${s["question__check"]} ${
                            isTicking && s["question__check--correct"]
                        }`}
                    >
                        <Icon name="check-circle" />
                    </i>
                </>
            ) : (
                <p className={s["question__loading"]}>Loading next question</p>
            )}
        </div>
    );
};

export default Question;
