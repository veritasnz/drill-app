import { useContext } from "react";

import drillData from "../../../data/drillData";
import ProgressContext from "../../context/progress-context";

import s from "./Levels.module.scss";

import Graveyard from "./Graveyard";
import Stage from "./Stage";

const stageColorsNames: string[] = ["green", "blue", "orange", "red"];

const StagesMenu: React.FC = () => {
    const progressCtx = useContext(ProgressContext);

    return (
        <>
            <Graveyard />

            <ul className={s["stage-list"]}>
                {drillData.map((stage, index) => {
                    const color = stageColorsNames[index];

                    return (
                        <Stage
                            key={stage.id}
                            stage={stage}
                            stageIndex={index}
                            color={color}
                        />
                    );
                })}
            </ul>
        </>
    );
};

export default StagesMenu;
