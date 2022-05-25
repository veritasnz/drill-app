import { useContext, useEffect, useRef, useState } from "react";

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

// Components
import DrillEmpty from "./DrillEmpty";
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

    // Tests if inputted answer is correct.
    // Progresses state appropriately, moving to post-answer state if correct
    const attemptHandler = (inputtedAnswer: ParticleEnum) => {
        const answerIsCorrect = checkAnswerIsCorrect(
            inputtedAnswer,
            drill.state.question.answers
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

    // Setup 'Next question →' handler & ref
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const nextButtonHandler = () => {
        if (isPostAnswer) {
            drill.correctHandler();
            setIsPostAnswer(false);
        }
    };
    useEffect(() => {
        if (isPostAnswer) nextButtonRef.current?.focus();
    }, [isPostAnswer]);

    // Render
    return (
        <>
            <LevelProgress drillState={drill.state} />

            {!drill.state.question ? (
                <DrillEmpty />
            ) : (
                <>
                    <Question
                        question={drill.state.question}
                        isPostAnswer={isPostAnswer}
                        nextButtonRef={nextButtonRef}
                        onNextButton={nextButtonHandler}
                        settingsCtx={settingsCtx}
                    />
                    <Keyboard
                        onAttempt={attemptHandler}
                        isPostAnswer={isPostAnswer}
                    />
                </>
            )}
        </>
    );
};

export default Drill;
