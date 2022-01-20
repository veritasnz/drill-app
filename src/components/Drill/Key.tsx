import React, { useEffect, useState } from "react";
import ParticleEnum from "../../models/ParticleEnum.model";

import s from "./Drill.module.scss";

interface Props {
    particle: ParticleEnum;
    isTicking: boolean;
    onAttempt: (answerEnum: ParticleEnum) => boolean;
}

const Key: React.FC<Props> = (props) => {
    const [colorState, setColorState] = useState("");

    const answerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Send key/particle input and store result
        const isCorrect = props.onAttempt(props.particle);

        if (isCorrect) {
            setColorState("correct");
        } else {
            setColorState("incorrect");
        }
    };

    useEffect(() => {
        if (!props.isTicking) setColorState("");
    }, [props.isTicking]);

    return (
        <div
            className={s["key"]}
            data-particle={props.particle}
            data-state={colorState}
        >
            <button
                onClick={answerHandler}
                className={s["key__button"]}
                type="button"
            >
                {props.particle}
            </button>
        </div>
    );
};

export default Key;
