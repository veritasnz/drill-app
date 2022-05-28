import type { NextPage } from "next";

import PaddingWrapper from "../src/components/PageLayout/PaddingWrapper";
import Empty from "../src/components/PageLayout/Empty";

const About: NextPage = () => {
    return (
        <PaddingWrapper>
            <Empty
                buttonText="See the Github repository"
                buttonUrl="https://github.com/veritasnz/wonideto"
            >
                <p>
                    The 'About' page will go here.
                    <br />
                    In the meantime, check out Wonideto's Github page.
                </p>
            </Empty>
        </PaddingWrapper>
    );
};

export default About;
