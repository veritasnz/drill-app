import { useContext, useEffect } from "react";

import drillData from "../../../../data/drillData";
import ProgressContext from "../../../context/progress-context";

const LevelMenu: React.FC = () => {
    const progressCtx = useContext(ProgressContext);

    return (
        <>
            <h1>Level Select</h1>
            <h2>Graveyard</h2>
            <p>Questions you done goofed</p>
            <button
                onClick={() => {
                    progressCtx.setLevelId("GRAVEYARD");
                }}
            >
                Select Graveyard
            </button>
            {drillData.map((stage) => {
                return (
                    <div className="o-prose" key={stage.name}>
                        <h2>{stage.name}</h2>
                        <p>{stage.difficulty}</p>
                        {stage.levels.map((level) => {
                            return (
                                <div key={level.name}>
                                    <h3>
                                        <button
                                            onClick={() => {
                                                progressCtx.setLevelId(
                                                    level.id
                                                );
                                            }}
                                        >
                                            {level.name}
                                        </button>
                                    </h3>
                                    <ul>
                                        {level.questions.map((question) => {
                                            return (
                                                <li key={question.question}>
                                                    <p>{question.question}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default LevelMenu;
