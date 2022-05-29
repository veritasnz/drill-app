import { useContext } from "react";
import type { NextPage } from "next";

// Contexts
import StatsContext from "../context/stats-context";
import ProgressContext from "../context/progress-context";

// API
import {
    getHighestCompletedLevel,
    getTotalLevelCount,
} from "../lib/level-api";

// Components
import Section from "../components/Blocks/Section";
import Title from "../components/Blocks/Title";
import StatBlock from "../components/Blocks/StatBlock";
import PaddingWrapper from "../components/PageLayout/PaddingWrapper";
import FeedbackForm from "../components/Form/FeedbackForm";

const Stats: NextPage = () => {
    const { totalCorrectAttempts, totalAttempts } = useContext(StatsContext);
    const { state } = useContext(ProgressContext);

    // Attempts content
    let attemptsContent = <small>No questions attempted!</small>;
    if (totalAttempts > 0) {
        attemptsContent = (
            <>
                <em>{totalCorrectAttempts}</em>
                {" / "}
                <strong>{totalAttempts}</strong>
            </>
        );
    }

    // Percentage correct calculations
    const percentageCorrect =
        totalAttempts > 0 // no dividing by zero
            ? Math.round((totalCorrectAttempts / totalAttempts) * 100)
            : 0;

    // Levels completed calculations
    const currLevelNumber = state.currentLevelNum;
    const totalLevelNumber = getTotalLevelCount();

    // Highest level completed calculations
    let highestLevelContent = (
        <small>
            {"First level hasn't"}
            <br />
            {"been completed yet."}
        </small>
    ); // fallback

    const highestLvl = getHighestCompletedLevel(state.answeredQuestionIds);

    if (highestLvl.name) {
        highestLevelContent = (
            <strong>
                <i>{`L${highestLvl.level} - ${highestLvl.name}`}</i>
            </strong>
        );
    }

    return (
        <PaddingWrapper>
            <Section>
                <Title heading={2} icon={"stats"}>
                    Stats
                </Title>
                <StatBlock title="Total questions answered correctly">
                    {attemptsContent}
                </StatBlock>
                <StatBlock title="Percentage correct">
                    <strong>
                        <em>{percentageCorrect}%</em>
                    </strong>
                </StatBlock>
                <StatBlock title="Current level">
                    <em>{currLevelNumber}</em>
                    {" / "}
                    <strong>{totalLevelNumber}</strong>
                </StatBlock>
                <StatBlock
                    title="Power Level"
                    description="(Highest completed level)"
                >
                    {highestLevelContent}
                </StatBlock>
            </Section>
            <Section>
                <Title heading={2} icon={"megaphone"}>
                    Feedback
                </Title>
                <FeedbackForm />
            </Section>
        </PaddingWrapper>
    );
};

export default Stats;
