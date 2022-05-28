import { useContext } from "react";

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
import Empty from "../PageLayout/Empty";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import Keyboard from "./Keyboard";

const Drill: React.FC = () => {
    // Vars
    const settingsCtx = useContext(SettingsContext);
    const statsCtx = useContext(StatsContext);
    const progressCtx = useContext(ProgressContext);

    const drill = useDrill(progressCtx);

    /**
     * Tests if inputted answer is correct.
     * Progresses state appropriately.
     * Returns a boolean, representing if the answer is correct (true) or incorrect (false)
     * @param inputtedAnswer
     * @returns
     */
    const attemptHandler = (inputtedAnswer: ParticleEnum) => {
        // Calculate if answer is correct
        const answerIsCorrect = checkAnswerIsCorrect(
            inputtedAnswer,
            drill.state.question.answers
        );

        // Progress state accordingly
        statsCtx.incrementTotalAttempts();
        if (answerIsCorrect) {
            statsCtx.incrementTotalCorrectAttempts();
            drill.correctHandler();
        } else {
            drill.incorrectHandler();
        }

        return answerIsCorrect;
    };

    // If level not set, show loading
    if (drill.state.currentLevel.id === "") return <></>;

    let content: JSX.Element = <></>;

    if (drill.state.question) {
        content = (
            <>
                <Question
                    drillState={drill.state}
                    onNextHandler={drill.nextQuestionHandler}
                    settingsCtx={settingsCtx}
                />
                <Keyboard
                    onAttempt={attemptHandler}
                    isPostAnswer={drill.state.isPostAnswer}
                />
            </>
        );
    } else {
        // If Graveyard is empty
        if (drill.state.currentLevel.id === "GRAVEYARD") {
            content = (
                <Empty buttonText="Pick a new level" buttonUrl="/levels">
                    <p>No questions left in the Graveyard. Well done!</p>
                </Empty>
            );
        } else {
            // If level is complete
            content = (
                <Empty buttonText="Go to the Levels page" buttonUrl="/levels">
                    <p>
                        All the available levels after this one have already
                        been finished! <br /> Go to the Levels page and choose
                        another one.
                    </p>
                </Empty>
            );
        }
    }

    // Render
    return (
        <>
            <ProgressBar drillState={drill.state} />
            {content}
        </>
    );
};

export default Drill;
