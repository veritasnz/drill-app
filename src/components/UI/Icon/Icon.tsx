/**
 * Component for retrieving icons
 */

import AboutCircle from "./svg/about-circle.svg";
import About from "./svg/about.svg";
import ArrowRightCircle from "./svg/arrow-right-circle.svg";
import ArrowRight from "./svg/arrow-right.svg";
import CheckCircle from "./svg/check-circle.svg";
import Check from "./svg/check.svg";
import CrossCircle from "./svg/cross-circle.svg";
import Cross from "./svg/cross.svg";
import DangerZone from "./svg/danger-zone.svg";
import Graveyard from "./svg/graveyard.svg";
import HomeCircle from "./svg/home-circle.svg";
import Home from "./svg/home.svg";
import Hourglass from "./svg/hourglass.svg";
import LevelCircle from "./svg/level-circle.svg";
import Megaphone from "./svg/megaphone.svg";
import Refresh from "./svg/refresh.svg";
import SettingsCircle from "./svg/settings-circle.svg";
import Settings from "./svg/settings.svg";
import StatsCircle from "./svg/stats-circle.svg";
import Stats from "./svg/stats.svg";
import Trash from "./svg/trash.svg";

interface Props {
    name: IconName;
}

export type IconName =
    | "about-circle"
    | "about"
    | "arrow-right-circle"
    | "arrow-right"
    | "check-circle"
    | "check"
    | "cross-circle"
    | "cross"
    | "danger-zone"
    | "graveyard"
    | "home-circle"
    | "home"
    | "hourglass"
    | "level-circle"
    | "megaphone"
    | "refresh"
    | "settings-circle"
    | "settings"
    | "stats-circle"
    | "stats"
    | "trash";

const Icon: React.FC<Props> = ({ name }) => {
    const icons = {
        "about-circle": <AboutCircle />,
        about: <About />,
        "arrow-right-circle": <ArrowRightCircle />,
        "arrow-right": <ArrowRight />,
        "check-circle": <CheckCircle />,
        check: <Check />,
        "cross-circle": <CrossCircle />,
        cross: <Cross />,
        "danger-zone": <DangerZone />,
        graveyard: <Graveyard />,
        "home-circle": <HomeCircle />,
        home: <Home />,
        hourglass: <Hourglass />,
        "level-circle": <LevelCircle />,
        megaphone: <Megaphone />,
        refresh: <Refresh />,
        "settings-circle": <SettingsCircle />,
        settings: <Settings />,
        "stats-circle": <StatsCircle />,
        stats: <Stats />,
        trash: <Trash />,
    };

    return icons[name];
};

export default Icon;
