import { useContext, useState } from "react";

// Models
import ParticleEnum from "../../models/ParticleEnum.model";

// Lib
import { checkAnswerIsCorrect } from "../../lib/drill-functions";

// Contexts
import SettingsContext from "../../context/settings-context";
import StatsContext from "../../context/stats-context";
import ProgressContext from "../../context/progress-context";

// Hooks
import useDrill from "../../hooks/useDrill";
import useKeyPress from "../../hooks/useKeyPress";

// Components
import LevelProgress from "./LevelProgress";
import Question from "./Question";
import Keyboard from "./Keyboard";

const Drill: React.FC = () => {
    // Vars
    const settingsCtx = useContext(SettingsContext);
    const statsCtx = useContext(StatsContext);
    const progressCtx = useContext(ProgressContext);
    const drill = useDrill(progressCtx);
    const [isPostAnswer, setIsPostAnswer] = useState(false);

    //
    const attemptHandler = (inputtedAnswer: ParticleEnum) => {
        const answerIsCorrect = checkAnswerIsCorrect(
            inputtedAnswer,
            drill.state.nextQuestion.answers
        );

        statsCtx.incrementTotalAttempts();

        if (answerIsCorrect) {
            statsCtx.incrementTotalCorrectAttempts();
            setIsPostAnswer(true);
            return true;
        } else {
            drill.incorrectHandler();
            return false;
        }
    };

    // 'Next question →' handler & keyboard listener
    const nextQuestionHandler = () => {
        drill.correctHandler();
        setIsPostAnswer(false);
    };
    const nextQuestionKeyHandler = (event) => {
        if (isPostAnswer) {
            nextQuestionHandler();
        }
    };
    useKeyPress(["Enter", "Space"], nextQuestionKeyHandler);

    // Render
    if (!drill.state.nextQuestion) {
        return <p>Finished! Choose next level</p>;
    }

    return (
        <>
            <LevelProgress drillState={drill.state} />
            <Question
                nextQuestion={drill.state.nextQuestion}
                isPostAnswer={isPostAnswer}
                onNextQuestion={nextQuestionHandler}
                settingsCtx={settingsCtx}
            />
            <Keyboard onAttempt={attemptHandler} isPostAnswer={isPostAnswer} />
        </>
    );
};

export default Drill;
