import { useContext } from "react";
import type { NextPage } from "next";

import SettingsContext from "../context/settings-context";
import StatsContext from "../context/stats-context";
import ProgressContext from "../context/progress-context";

import PaddingWrapper from "../components/PageLayout/PaddingWrapper";
import Section from "../components/Blocks/Section";
import Title from "../components/Blocks/Title";
import ToggleBlock from "../components/Blocks/ToggleBlock";

import ButtonWrap from "../components/UI/ButtonWrap";
import TransitionButton from "../components/UI/TransitionButton";

const Settings: NextPage = () => {
    const settingsCtx = useContext(SettingsContext);
    const statsCtx = useContext(StatsContext);
    const progressCtx = useContext(ProgressContext);

    const resetSettingsHandler = () => {
        settingsCtx.resetSettings();
    };

    const resetProgressHandler = () => {
        progressCtx.resetProgress();
        statsCtx.resetStats();
    };

    return (
        <PaddingWrapper>
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
                <ButtonWrap>
                    <TransitionButton
                        title="Reset the above settings back to default"
                        onClick={resetSettingsHandler}
                        preText="Reset Settings"
                        postText="Settings Reset"
                        color="orange"
                        icon="refresh"
                    />
                    <TransitionButton
                        title="Reset progress for all levels, as well as reset stats"
                        onClick={resetProgressHandler}
                        preText="Reset All Progress"
                        postText="Progress Reset"
                        color="red"
                        icon="trash"
                    />
                </ButtonWrap>
            </Section>
        </PaddingWrapper>
    );
};

export default Settings;
