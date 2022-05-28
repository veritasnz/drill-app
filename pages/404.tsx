import type { NextPage } from "next";

import Empty from "../src/components/PageLayout/Empty";
import PaddingWrapper from "../src/components/PageLayout/PaddingWrapper";

const Levels: NextPage = () => {
    return (
        <PaddingWrapper>
            <Empty buttonText="Go to the Home page" buttonUrl="/">
                <p>
                    {
                        "We looked everywhere, but the page you were searching for doesn't exist 😣"
                    }
                </p>
            </Empty>
        </PaddingWrapper>
    );
};

export default Levels;
