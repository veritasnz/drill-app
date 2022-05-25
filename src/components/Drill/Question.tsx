import React, { Ref, useEffect, useRef, useState } from "react";

import { SettingsContextState } from "../../context/settings-context";
import QuestionT from "../../models/Question.model";

import s from "./Drill.module.scss";

import QuestionText from "./QuestionText";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button";

interface Props {
    nextQuestion: QuestionT;
    isPostAnswer: boolean;
    nextQuestionButtonRef: Ref<HTMLButtonElement> | null;
    onNextQuestion: () => void;
    settingsCtx: SettingsContextState;
}

const Question: React.FC<Props> = ({
    nextQuestion,
    isPostAnswer,
    nextQuestionButtonRef,
    onNextQuestion,
    settingsCtx,
}) => {
    /**
     * Play audio when 'isPostAnswer' changes
     */
    const audioRef = useRef(new Audio());
    audioRef.current.autoplay = true;

    useEffect(() => {
        if (isPostAnswer && settingsCtx.autoplayIsOn) {
            try {
                audioRef.current.src = `/audio/${nextQuestion.id}.mp3`;
                audioRef.current.play();
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error(
                        `Media play error: ${err.name} - ${err.message}`
                    );
                }
            }
        } else {
            audioRef.current.pause();
        }
    }, [isPostAnswer, nextQuestion.id, settingsCtx.autoplayIsOn]);

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

                    <div className={s["question__next"]}>
                        <Button
                            ref={nextQuestionButtonRef}
                            id="question-next-button"
                            color="green-next"
                            onClick={onNextQuestion}
                            disabled={!isPostAnswer}
                            icon="arrow-right"
                        >
                            Next Question
                        </Button>
                    </div>
                </>
            ) : (
                <p className={s["question__loading"]}>Loading next question</p>
            )}
        </div>
    );
};
Question.displayName = "Question";

export default Question;
