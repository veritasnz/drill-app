import { useContext, useState } from "react";

import ParticleEnum from "../../models/ParticleEnum.model";
import { checkAnswerIsCorrect } from "../../lib/drill-functions";

import SettingsContext from "../../context/settings-context";
import StatsContext from "../../context/stats-context";
import ProgressContext from "../../context/progress-context";
import useDrill from "../../hooks/useDrill";

import s from "./Drill.module.scss";

import LevelProgress from "./LevelProgress";
import Key from "./Key";
import Question from "./Question";

const Drill: React.FC = () => {
    const settingsCtx = useContext(SettingsContext);
    const statsCtx = useContext(StatsContext);
    const progressCtx = useContext(ProgressContext);

    const { drillState, correctAnswerHandler, incorrectAnswerHandler } =
        useDrill(progressCtx);

    const [isCorrect, setIsCorrect] = useState(false);

    const attemptHandler = (inputtedAnswer: ParticleEnum) => {
        const answerIsCorrect = checkAnswerIsCorrect(
            inputtedAnswer,
            drillState.nextQuestion.answers
        );

        statsCtx.incrementTotalAttempts();

        if (answerIsCorrect) {
            statsCtx.incrementTotalCorrectAttempts();
            setIsCorrect(true);

            return true;
        } else {
            incorrectAnswerHandler();
            return false;
        }
    };

    const nextQuestionHandler = () => {
        correctAnswerHandler();
        setIsCorrect(false);
    };

    if (!drillState.nextQuestion) {
        return <p>Finished! Choose next level</p>;
    }

    return (
        <>
            <LevelProgress drillState={drillState} />
            <Question
                drillState={drillState}
                isCorrect={isCorrect}
                onNextQuestion={nextQuestionHandler}
            />

            <div
                className={`${s["keyboard"]} ${
                    isCorrect && s["keyboard--disabled"]
                }`}
            >
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.GA}
                    isCorrect={isCorrect}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.DE}
                    isCorrect={isCorrect}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.TO}
                    isCorrect={isCorrect}
                />

                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.NI}
                    isCorrect={isCorrect}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.HE}
                    isCorrect={isCorrect}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.WO}
                    isCorrect={isCorrect}
                />

                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.KARA}
                    isCorrect={isCorrect}
                />
                <Key
                    onAttempt={attemptHandler}
                    particle={ParticleEnum.MADE}
                    isCorrect={isCorrect}
                />
            </div>
        </>
    );
};

export default Drill;
