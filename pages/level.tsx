import type { NextPage } from "next";

import PageWrapper from "../src/components/PageLayout/PageWrapper";
import LevelMenu from "../src/components/Levels/LevelMenu/LevelMenu";

const Level: NextPage = () => {
    return (
        <PageWrapper>
            <LevelMenu />
        </PageWrapper>
    );
};

export default Level;
