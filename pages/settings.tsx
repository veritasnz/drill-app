import { useContext } from "react";
import type { NextPage } from "next";

import SettingsContext from "../src/context/settings-context";
import StatsContext from "../src/context/stats-context";
import ProgressContext from "../src/context/progress-context";

import PageWrapper from "../src/components/PageLayout/PageWrapper";
import ToggleSwitch from "../src/components/UI/ToggleSwitch";
import Section from "../src/components/Blocks/Section";
import Title from "../src/components/Blocks/Title";

const Settings: NextPage = () => {
    const settingsCtx = useContext(SettingsContext);
    const statsCtx = useContext(StatsContext);
    const progressCtx = useContext(ProgressContext);

    const autoplayToggleHandler = (_checked: boolean) => {
        settingsCtx.toggleAutoplayIsOn();
    }

    return (
        <PageWrapper>
            <Section>
                <Title>Settings</Title>
            </Section>
            <ToggleSwitch
                id="autoplay"
                onToggle={autoplayToggleHandler}
                isChecked={settingsCtx.autoplayIsOn}
            />
        </PageWrapper>
    );
};

export default Settings;
