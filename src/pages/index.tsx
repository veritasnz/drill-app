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

export async function getStaticProps() {
    // If production, build script page & build audio files
    if (process.env.NODE_ENV == "production") {
        const allQuestions = getAllQuestions();
        await buildAudio(allQuestions);
        buildQuestionMap(allQuestions);
    }

    return {
        props: {},
    };
}
