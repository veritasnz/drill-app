import React, { useEffect, useRef } from "react";

import { SettingsContextState } from "../../context/settings-context";
import QuestionT from "../../models/Question.model";

import s from "./Drill.module.scss";

import QuestionText from "./QuestionText";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button";

interface Props {
    nextQuestion: QuestionT;
    isPostAnswer: boolean;
    onNextQuestion: () => void;
    settingsCtx: SettingsContextState;
}

const Question: React.FC<Props> = ({
    nextQuestion,
    isPostAnswer,
    onNextQuestion,
    settingsCtx,
}) => {
    /**
     * Play audio when 'isPostAnswer' changes
     */
    const audioElement = useRef(new Audio());
    useEffect(() => {
        if (isPostAnswer && settingsCtx.autoplayIsOn) {
            audioElement.current.src = `/audio/${nextQuestion.id}.mp3`;
            audioElement.current.play();
        } else {
            audioElement.current.pause();
        }
    }, [isPostAnswer]);

    /**
     * Render
     */
    return (
        <div
            className={`
                ${s["question"]}
                ${settingsCtx.showFurigana || s["question--no-fur"]}
            `}
        >
            {nextQuestion ? (
                <>
                    <div className={s["question__wrap"]}>
                        <QuestionText
                            nextQuestion={nextQuestion}
                            isPostAnswer={isPostAnswer}
                        />
                        <i
                            className={`${s["question__check"]} ${
                                isPostAnswer && s["question__check--correct"]
                            }`}
                        >
                            <Icon name="check-circle" />
                        </i>
                    </div>

                    {
                        // Only show English if it is post-answer screen / English is enabled
                        (isPostAnswer || settingsCtx.showEnglish) && (
                            <div className={s["question__eng"]}>
                                {nextQuestion.english}
                            </div>
                        )
                    }

                    {
                        // Show next button on the post-answer screen
                        isPostAnswer && (
                            <>
                                <div className={s["question__next"]}>
                                    <Button
                                        color="green"
                                        onClick={onNextQuestion}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </>
                        )
                    }
                </>
            ) : (
                <p className={s["question__loading"]}>Loading next question</p>
            )}
        </div>
    );
};

export default Question;
