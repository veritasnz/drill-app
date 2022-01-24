import { useContext } from "react";

import ParticleEnum from "../../models/ParticleEnum.model";
import { checkAnswerIsCorrect } from "../../lib/drill-functions";

import SettingsContext from "../../context/settings-context";
import StatsContext from "../../context/stats-context";
import ProgressContext from "../../context/progress-context";
import useDrill from "../../hooks/useDrill";
import useTimer from "../../hooks/useTimer";

import s from "./Drill.module.scss";

import LevelProgress from "./LevelProgress";
import Key from "./Key";

const Drill: React.FC = () => {
    const settingsCtx = useContext(SettingsContext);
    const statsCtx = useContext(StatsContext);
    const progressCtx = useContext(ProgressContext);

    const { drillState, correctAnswerHandler, incorrectAnswerHandler } =
        useDrill(progressCtx);

    const [isTicking, startTimer] = useTimer(1000);

    const attemptHandler = (inputtedAnswer: ParticleEnum) => {
        const answerIsCorrect = checkAnswerIsCorrect(
            inputtedAnswer,
            drillState.nextQuestion.answers
        );

        statsCtx.incrementTotalAttempts();

        if (answerIsCorrect) {
            statsCtx.incrementTotalCorrectAttempts();
            startTimer(correctAnswerHandler);

            return true;
        } else {
            incorrectAnswerHandler();
            return false;
        }
    };

    if (!drillState.nextQuestion) {
        return <p>Finished! Choose next level</p>;
    }

    return (
        <>
            <LevelProgress drillState={drillState} />

            <div
                className={`${s["question"]} ${
                    isTicking && s["question--correct"]
                }`}
            >
                <p className={s["question__text"]}>
                    {drillState.nextQuestion
                        ? drillState.nextQuestion.question
                        : "Loading next question"}
                </p>
            </div>

            <div
                className={`${s["keyboard"]} ${
                    isTicking && s["keyboard--disabled"]
                }`}
            >
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.GA}
                    isTicking={isTicking}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.DE}
                    isTicking={isTicking}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.TO}
                    isTicking={isTicking}
                />

                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.NI}
                    isTicking={isTicking}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.HE}
                    isTicking={isTicking}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.WO}
                    isTicking={isTicking}
                />

                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.KARA}
                    isTicking={isTicking}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.MADE}
                    isTicking={isTicking}
                />
            </div>
        </>
    );
};

export default Drill;
