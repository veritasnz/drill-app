import type { NextPage } from "next";

import LayoutWrapper from "../src/components/PageLayout/LayoutWrapper";
import LevelsMenu from "../src/components/Levels/StagesMenu";

const Levels: NextPage = () => {
    return (
        <LayoutWrapper>
            <LevelsMenu />
        </LayoutWrapper>
    );
};

export default Levels;
