import { useContext } from "react";
import type { NextPage } from "next";

// Contexts
import StatsContext from "../src/context/stats-context";
import ProgressContext from "../src/context/progress-context";

// API
import {
    getHighestCompletedLevel,
    getTotalLevelCount,
} from "../src/lib/level-api";

// Components
import Section from "../src/components/Blocks/Section";
import Title from "../src/components/Blocks/Title";
import StatBlock from "../src/components/Blocks/StatBlock";
import PaddingWrapper from "../src/components/PageLayout/PaddingWrapper";

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
    let highestLevelContent = <small>No levels completed!</small>; // fallback

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
                <p>Feedback form goes here</p>
            </Section>
        </PaddingWrapper>
    );
};

export default Stats;
