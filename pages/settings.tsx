import { useContext } from "react";
import type { NextPage } from "next";

import SettingsContext from "../src/context/settings-context";
import StatsContext from "../src/context/stats-context";
import ProgressContext from "../src/context/progress-context";

import PageWrapper from "../src/components/PageLayout/PageWrapper";
import Section from "../src/components/Blocks/Section";
import Title from "../src/components/Blocks/Title";
import ToggleBlock from "../src/components/Blocks/ToggleBlock";

const Settings: NextPage = () => {
    const settingsCtx = useContext(SettingsContext);
    const statsCtx = useContext(StatsContext);
    const progressCtx = useContext(ProgressContext);

    return (
        <PageWrapper>
            <Section>
                <Title heading={2} icon={"settings"}>
                    Settings
                </Title>
                <ToggleBlock
                    title="Audio"
                    description="Enable or disable automatic readings for sentences"
                    stateVar={settingsCtx.autoplayIsOn}
                    onToggle={settingsCtx.toggleAutoplayIsOn}
                />
                <ToggleBlock
                    title="Display Furigana"
                    description="Even with furigana disabled, you can still preview a word’s furigana by tapping/clicking on the word"
                    stateVar={settingsCtx.showFurigana}
                    onToggle={settingsCtx.toggleShowFurigana}
                />
                <ToggleBlock
                    title="Show English"
                    description="Enable or disable display of English translations after correct answers"
                    stateVar={settingsCtx.showEnglish}
                    onToggle={settingsCtx.toggleShowEnglish}
                />
            </Section>
            <Section>
                <Title heading={2} icon={"danger-zone"}>
                    Danger Zone
                </Title>
            </Section>
        </PageWrapper>
    );
};

export default Settings;
