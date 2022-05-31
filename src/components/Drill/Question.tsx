import React, { useEffect, useRef } from "react";

// Models
import QuestionT from "../../models/Question.model";
import { DrillStateType } from "../../hooks/useDrill";

// Context
import { SettingsContextState } from "../../context/settings-context";

// Components
import QuestionText from "./QuestionText";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button";

import s from "./Drill.module.scss";

interface Props {
    drillState: DrillStateType;
    onNextHandler: () => void;
    settingsCtx: SettingsContextState;
}

const Question: React.FC<Props> = ({
    drillState: ds,
    onNextHandler,
    settingsCtx,
}) => {
    /*
     * Setup Next Button
     * When 'ds.isPostAnswer' updates and is true,
     * focus on nextbutton else focus on docEl
     * (docEl requires refocusing b/c of FF bug)
     */
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (ds.isPostAnswer) {
            nextButtonRef.current?.focus();
        } else {
            document.documentElement.focus();
        }
    }, [ds.isPostAnswer]);

    /*
     * Play audio when 'isPostAnswer' changes
     */
    const audioRef = useRef(new Audio());
    audioRef.current.autoplay = true;

    useEffect(() => {
        if (ds.isPostAnswer && settingsCtx.autoplayIsOn) {
            try {
                audioRef.current.src = `/audio/${ds.question.id}.mp3`;
                (async () => {
                    await audioRef.current.play();
                })();
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
    }, [ds.isPostAnswer, ds.question.id, settingsCtx.autoplayIsOn]);

    /*
     * Render
     */
    return (
        <div
            className={`
                ${s["question"]}
                ${settingsCtx.showFurigana || s["question--no-fur"]}
            `}
        >
            {ds.question ? (
                <>
                    <div className={s["question__wrap"]}>
                        <QuestionText
                            question={ds.question}
                            isPostAnswer={ds.isPostAnswer}
                        />
                        <i
                            className={`${s["question__check"]} ${
                                ds.isPostAnswer && s["question__check--correct"]
                            }`}
                        >
                            <Icon name="check-circle" />
                        </i>
                    </div>

                    {
                        // Only show English if it is post-answer screen / English is enabled
                        (ds.isPostAnswer || settingsCtx.showEnglish) && (
                            <div className={s["question__eng"]}>
                                {ds.question.english}
                            </div>
                        )
                    }

                    <div className={s["question__next"]}>
                        <Button
                            ref={nextButtonRef}
                            color="green-next"
                            onClick={onNextHandler}
                            disabled={!ds.isPostAnswer}
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
