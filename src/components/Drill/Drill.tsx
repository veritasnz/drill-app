import { useContext, useState } from "react";

import ParticleEnum from "../../models/ParticleEnum.model";
import { checkAnswerIsCorrect } from "../../lib/drill-functions";

import SettingsContext from "../../context/settings-context";
import StatsContext from "../../context/stats-context";
import ProgressContext from "../../context/progress-context";
import useDrill from "../../hooks/useDrill";

import LevelProgress from "./LevelProgress";
import Question from "./Question";
import Keyboard from "./Keyboard";

const Drill: React.FC = () => {
    const settingsCtx = useContext(SettingsContext);
    const statsCtx = useContext(StatsContext);
    const progressCtx = useContext(ProgressContext);

    const { drillState, correctAnswerHandler, incorrectAnswerHandler } =
        useDrill(progressCtx);

    const [isPostAnswer, setIsPostAnswer] = useState(false);

    const attemptHandler = (inputtedAnswer: ParticleEnum) => {
        const answerIsCorrect = checkAnswerIsCorrect(
            inputtedAnswer,
            drillState.nextQuestion.answers
        );

        statsCtx.incrementTotalAttempts();

        if (answerIsCorrect) {
            statsCtx.incrementTotalCorrectAttempts();
            setIsPostAnswer(true);
            return true;
        } else {
            incorrectAnswerHandler();
            return false;
        }
    };

    const nextQuestionHandler = () => {
        correctAnswerHandler();
        setIsPostAnswer(false);
    };

    /**
     * Return
     */
    if (!drillState.nextQuestion) {
        return <p>Finished! Choose next level</p>;
    }

    return (
        <>
            <LevelProgress drillState={drillState} />
            <Question
                drillState={drillState}
                isPostAnswer={isPostAnswer}
                onNextQuestion={nextQuestionHandler}
                settingsCtx={settingsCtx}
            />
            <Keyboard onAttempt={attemptHandler} isPostAnswer={isPostAnswer} />
        </>
    );
};

export default Drill;
