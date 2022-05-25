import drillData from "../../data/drillData";

import s from "./Levels.module.scss";

import Graveyard from "./Graveyard";
import Stage from "./Stage";

const StagesMenu: React.FC = () => {
    const stageColorsNames: string[] = [
        "green",
        "blue",
        "orange",
        "red",
        "black",
    ];

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
