import React, { useEffect, useState } from "react";

import ParticleEnum from "../../models/ParticleEnum.model";
import useKeyPress from "../../hooks/useKeyPress";

import s from "./Drill.module.scss";

interface KeyBoardProps {
    isPostAnswer: boolean;
    onAttempt: (answerEnum: ParticleEnum) => boolean;
}

const Keyboard: React.FC<Props> = ({ isPostAnswer, onAttempt }) => {
    const focusParticle = (keyChar: string) => {
        switch (keyChar) {
            case "g":
            case "d":
            case "t":
            case "n":
            case "h":
            case "w":
            case "k":
            case "m":
        }
    };

    const onParticleHighlight = (event: KeyboardEvent) => {};

    useKeyPress(["g", "d", "t", "n", "h", "w", "k", "m"], onParticleHighlight);

    const particleList = [
        ParticleEnum.GA,
        ParticleEnum.DE,
        ParticleEnum.TO,
        ParticleEnum.NI,
        ParticleEnum.HE,
        ParticleEnum.WO,
        ParticleEnum.KARA,
        ParticleEnum.MADE,
    ];

    return (
        <div
            className={`
        ${s["keyboard"]}
        ${isPostAnswer && s["keyboard--disabled"]}
    `}
        >
            {particleList.map((particle) => {
                return (
                    <Key
                        key={particle}
                        onAttempt={onAttempt}
                        particle={particle}
                        isPostAnswer={isPostAnswer}
                    />
                );
            })}
        </div>
    );
};

/**
 * Key
 */
interface KeyProps {
    particle: ParticleEnum;
    isPostAnswer: boolean;
    onAttempt: (answerEnum: ParticleEnum) => boolean;
}

const Key: React.FC<KeyProps> = (props) => {
    const [colorState, setColorState] = useState("");

    const answerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Send key/particle input and store result
        const keyIsCorrect = props.onAttempt(props.particle);
        setColorState(keyIsCorrect ? "correct" : "incorrect");
    };

    useEffect(() => {
        if (!props.isPostAnswer) setColorState("");
    }, [props.isPostAnswer]);

    return (
        <div
            className={s["key"]}
            data-particle={props.particle}
            data-state={colorState}
        >
            <button
                id={props.particle}
                onClick={answerHandler}
                className={s["key__button"]}
                type="button"
            >
                {props.particle}
            </button>
        </div>
    );
};

export default Keyboard;
