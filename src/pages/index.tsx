import type { NextPage } from "next";

import buildAudio from "../lib/build-audio";

import Drill from "../components/Drill/Drill";
import PaddingWrapper from "../components/PageLayout/PaddingWrapper";

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
    await buildAudio();

    return {
        props: {},
    };
}
