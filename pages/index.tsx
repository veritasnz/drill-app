import type { NextPage } from "next";

import PageWrapper from "../src/components/Layout/PageWrapper";
import Drill from "../src/components/Drill/Drill";
import { buildVoices } from "../src/lib/build-voices";

const Home: NextPage = () => {
    return (
        <PageWrapper>
            <Drill />
        </PageWrapper>
    );
};

export default Home;

/**
 * Build Voices
 */
export async function getStaticProps() {
    await buildVoices();

    return {
        props: {},
    };
}
