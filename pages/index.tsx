import type { NextPage } from "next";

import buildAudio from "../src/lib/build-audio";

import PageWrapper from "../src/components/Layout/PageWrapper";
import Drill from "../src/components/Drill/Drill";

const Home: NextPage = () => {
    return (
        <PageWrapper>
            <Drill />
        </PageWrapper>
    );
};

export default Home;

/**
 * Build Audio
 */
export async function getStaticProps() {
    await buildAudio();

    return {
        props: {},
    };
}
