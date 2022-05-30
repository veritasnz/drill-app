import type { NextPage } from "next";

import { getAllQuestions } from "../lib/question-api";
import buildAudio from "../lib/build/build-audio";

import Drill from "../components/Drill/Drill";
import PaddingWrapper from "../components/PageLayout/PaddingWrapper";
import buildQuestionMap from "../lib/build/build-question-map";

const Home: NextPage = () => {
    return (
        <PaddingWrapper>
            <Drill />
        </PaddingWrapper>
    );
};

export default Home;

/**
 * Build script – Build Audio
 */
export async function getStaticProps() {
    const allQuestions = getAllQuestions();
    await buildAudio(allQuestions);
    buildQuestionMap(allQuestions);

    return {
        props: {},
    };
}
