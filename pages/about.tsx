import type { NextPage } from "next";
import LayoutWrapper from "../src/components/PageLayout/LayoutWrapper";
import PaddingWrapper from "../src/components/PageLayout/PaddingWrapper";

const About: NextPage = () => {
    return (
        <LayoutWrapper>
            <PaddingWrapper>
                <p>About page goes here</p>
            </PaddingWrapper>
        </LayoutWrapper>
    );
};

export default About;
