import React, { useEffect, useState } from "react";

import ParticleEnum from "../../models/ParticleEnum.model";
import useKeyPress from "../../hooks/useKeyPress";

import s from "./Drill.module.scss";

interface KeyBoardProps {
    isPostAnswer: boolean;
    onAttempt: (answerEnum: ParticleEnum) => boolean;
}

const Keyboard: React.FC<KeyBoardProps> = ({ isPostAnswer, onAttempt }) => {
    const particleKeyPairs: { [keyName: string]: ParticleEnum } = {
        KeyG: ParticleEnum.GA,
        KeyD: ParticleEnum.DE,
        KeyT: ParticleEnum.TO,
        KeyN: ParticleEnum.NI,
        KeyH: ParticleEnum.HE,
        KeyW: ParticleEnum.WO,
        KeyK: ParticleEnum.KARA,
        KeyM: ParticleEnum.MADE,
    };

    // Assign keyFocusHandler to particle keys
    const keyFocusHandler = (event: KeyboardEvent) => {
        document.getElementById(particleKeyPairs[event.code])?.focus();
    };
    useKeyPress(Object.keys(particleKeyPairs), keyFocusHandler);

    // Build Keys for render
    const keysArray: JSX.Element[] = [];
    for (const keyChar in particleKeyPairs) {
        keysArray.push(
            <Key
                key={keyChar}
                onAttempt={onAttempt}
                particle={particleKeyPairs[keyChar]}
                isPostAnswer={isPostAnswer}
            />
        );
    }

    return (
        <div
            className={`${s["keyboard"]} ${
                isPostAnswer && s["keyboard--disabled"]
            }`}
        >
            {keysArray}
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
                disabled={props.isPostAnswer}
            >
                {props.particle}
            </button>
        </div>
    );
};

export default Keyboard;
