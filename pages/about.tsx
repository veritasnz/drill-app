import type { NextPage } from "next";

import PaddingWrapper from "../src/components/PageLayout/PaddingWrapper";
import Section from "../src/components/Blocks/Section";
import Prose from "../src/components/Blocks/Prose";

const About: NextPage = () => {
    return (
        <PaddingWrapper>
            <Section>
                <Prose>
                    <p>{`The 'About' page will go here.`}</p>
                    <p>
                        {`In the meantime, check out Wonideto's `}
                        <a
                            href="https://github.com/veritasnz/wonideto"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {`Github repository`}
                        </a>
                        .
                    </p>
                </Prose>
            </Section>
        </PaddingWrapper>
    );
};

export default About;
