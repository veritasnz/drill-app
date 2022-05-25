import React, { Ref, useEffect, useRef, useState } from "react";

import { SettingsContextState } from "../../context/settings-context";
import QuestionT from "../../models/Question.model";

import s from "./Drill.module.scss";

import QuestionText from "./QuestionText";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button";

interface Props {
    question: QuestionT;
    isPostAnswer: boolean;
    nextButtonRef: Ref<HTMLButtonElement> | null;
    onNextButton: () => void;
    settingsCtx: SettingsContextState;
}

const Question: React.FC<Props> = ({
    question,
    isPostAnswer,
    nextButtonRef,
    onNextButton,
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
                audioRef.current.src = `/audio/${question.id}.mp3`;
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
    }, [isPostAnswer, question.id, settingsCtx.autoplayIsOn]);

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
            {question ? (
                <>
                    <div className={s["question__wrap"]}>
                        <QuestionText
                            question={question}
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
                                {question.english}
                            </div>
                        )
                    }

                    <div className={s["question__next"]}>
                        <Button
                            ref={nextButtonRef}
                            color="green-next"
                            onClick={onNextButton}
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
