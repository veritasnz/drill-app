import React, { Ref, useEffect, useRef } from "react";

import { SettingsContextState } from "../../context/settings-context";
import QuestionT from "../../models/Question.model";

import s from "./Drill.module.scss";

import QuestionText from "./QuestionText";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button";

interface Props {
    nextQuestion: QuestionT;
    isPostAnswer: boolean;
    nextQuestionRef: Ref<HTMLButtonElement> | null;
    onNextQuestion: () => void;
    settingsCtx: SettingsContextState;
}

const Question: React.FC<Props> = ({
    nextQuestion,
    isPostAnswer,
    nextQuestionRef,
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
                            ref={nextQuestionRef}
                            id="question-next-button"
                            color="green"
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
