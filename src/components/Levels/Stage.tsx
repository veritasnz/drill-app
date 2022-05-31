import s from "./Levels.module.scss";

import StageModel from "../../models/Stage.model";
import Level from "./Level";

interface Props {
    stage: StageModel;
    stageIndex: number;
    color?: string;
}

const Stage: React.FC<Props> = ({ stage, stageIndex, color }) => {
    const className = `${s["stage"]} ${s["stage-wrap"]} ${
        color && s[`stage-wrap--${color}`]
    }`;

    return (
        <li className={className}>
            <div className={s["stage-wrap__inner"]}>
                <div className={s["stage__tit"]}>
                    <h2>
                        <strong>Stage {stageIndex + 1}. </strong>
                        <span>{stage.name}</span>
                    </h2>
                    <p>{stage.difficulty}</p>
                </div>
                <ul className={s["stage__levels"]}>
                    {stage.levels.map((level) => {
                        return <Level key={level.id} level={level} />;
                    })}
                </ul>
            </div>
        </li>
    );
};

export default Stage;
