import React, { useEffect, useRef, useState } from "react";

import { SettingsContextState } from "../../context/settings-context";
import { DrillStateType } from "../../hooks/useDrill";
import { rubifyDrillQuestion } from "../../lib/question-parser";

import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button";

import s from "./Drill.module.scss";

interface Props {
    drillState: DrillStateType;
    isPostAnswer: boolean;
    onNextQuestion: () => void;
    settingsCtx: SettingsContextState;
}

const Question: React.FC<Props> = ({
    drillState,
    isPostAnswer,
    onNextQuestion,
    settingsCtx,
}) => {
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

    // Update placeholder when 'isPostAnswer' changes
    useEffect(() => {
        if (isPostAnswer) {
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
    }, [isPostAnswer]);

    // Play audio when 'isPostAnswer' changes
    const audioElement = useRef(new Audio());

    useEffect(() => {
        if (isPostAnswer && settingsCtx.autoplayIsOn) {
            audioElement.current.src = `/audio/${nextQuestion.id}.mp3`;
            audioElement.current.play();
        } else {
            audioElement.current.pause();
        }
    }, [isPostAnswer]);

    return (
        <div
            className={`
                ${s["question"]}
                ${settingsCtx.showEnglish || s["question--no-eng"]}
                ${settingsCtx.showFurigana || s["question--no-fur"]}
            `}
        >
            {nextQuestion ? (
                <>
                    <div className={s["question__wrap"]}>
                        <p className={s["question__text"]}>
                            {firstHalf}
                            <span className={`${s["question__place-wrap"]}`}>
                                <span
                                    className={`${s["question__place-inner"]} ${
                                        isPostAnswer &&
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
                                isPostAnswer && s["question__check--correct"]
                            }`}
                        >
                            <Icon name="check-circle" />
                        </i>
                    </div>
                    {isPostAnswer && (
                        <>
                            <div className={s["question__eng"]}>
                                {nextQuestion.english}
                            </div>
                            <div className={s["question__next"]}>
                                <Button color="green" onClick={onNextQuestion}>
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <p className={s["question__loading"]}>Loading next question</p>
            )}
        </div>
    );
};

export default Question;
