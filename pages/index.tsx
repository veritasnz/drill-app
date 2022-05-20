import type { NextPage } from "next";

import buildAudio from "../src/lib/build-audio";

import LayoutWrapper from "../src/components/PageLayout/LayoutWrapper";
import Drill from "../src/components/Drill/Drill";
import PaddingWrapper from "../src/components/PageLayout/PaddingWrapper";

const Home: NextPage = () => {
    return (
        <LayoutWrapper>
            <PaddingWrapper>
                <Drill />
            </PaddingWrapper>
        </LayoutWrapper>
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
