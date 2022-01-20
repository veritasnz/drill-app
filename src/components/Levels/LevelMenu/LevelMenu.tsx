import { useContext, useEffect } from "react";

import drillData from "../../../../data/drillData";

import SettingsContext from "../../../context/settings-context";

const LevelMenu: React.FC = () => {
    const settingsCtx = useContext(SettingsContext);

    return (
        <>
            <h1>Level Select</h1>
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
                                                settingsCtx.setLevelId(
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
