import { useContext } from "react";
import type { NextPage } from "next";

import StatsContext from "../src/context/stats-context";
import ProgressContext from "../src/context/progress-context";
import {
    getAllLevels,
    getLevelIndex,
    getTotalLevelCount,
} from "../src/lib/level-api";

import Section from "../src/components/Blocks/Section";
import Title from "../src/components/Blocks/Title";
import StatBlock from "../src/components/Blocks/StatBlock";
import { getUnansweredQuestionsInLevel } from "../src/lib/question-api";
import PaddingWrapper from "../src/components/PageLayout/PaddingWrapper";

const Stats: NextPage = () => {
    const { totalCorrectAttempts, totalAttempts } = useContext(StatsContext);
    const progressCtx = useContext(ProgressContext);

    // Percentage correct calculations
    const percentageCorrect =
        totalAttempts > 0 // no dividing by zero
            ? Math.round((totalCorrectAttempts / totalAttempts) * 100)
            : 0;

    // Levels completed calculations
    const currLevelNumber = getLevelIndex(progressCtx.currentLevelId) + 1; // +1 to account for array offset
    const totalLevelNumber = getTotalLevelCount();

    // Highest level completed calculations
    let highestLevelContent = <>No levels completed!</>; // fallback

    const highestLvl = getHighestCompletedLevel(
        progressCtx.answeredQuestionIds
    );

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
                    <em>{totalCorrectAttempts}</em>
                    {" / "}
                    <strong>{totalAttempts}</strong>
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

type HighestLevelObj = { name: string; level: number };

const getHighestCompletedLevel = (answeredIds: string[]) => {
    const allLevels = getAllLevels();
    let highestLevel: Partial<HighestLevelObj> = {};

    allLevels.every((level, index) => {
        const unansweredQuestions = getUnansweredQuestionsInLevel(
            answeredIds,
            level.questions
        );

        if (unansweredQuestions.length > 0) return false;

        highestLevel = {
            name: level.name,
            level: index + 1,
        };
        return true;
    });

    return highestLevel;
};
