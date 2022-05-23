import React, { useEffect, useRef, useState } from "react";

import ParticleEnum from "../../models/ParticleEnum.model";
import useKeyPress from "../../hooks/useKeyPress";

import s from "./Drill.module.scss";

interface KeyBoardProps {
    isPostAnswer: boolean;
    onAttempt: (answerEnum: ParticleEnum) => boolean;
}

type KeyRefsType = { [key: string]: HTMLButtonElement };

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

    //Set up keyFocus handler and keyRefs
    const keyRefs = useRef<KeyRefsType>({});
    const keyFocusHandler = (event: KeyboardEvent) => {
        keyRefs.current[event.code].focus();
    };

    // Assign keyFocusHandler to particle keys
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
                // Assign refs to buttons dynamically
                ref={(el: HTMLButtonElement) => (keyRefs.current[keyChar] = el)}
            />
        );
    }

    return (
        <div
            className={`${s["keyboard"]} ${
                isPostAnswer && s["keyboard--post-ans"]
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
    [key: string]: any;
}

const Key: React.FC<KeyProps> = React.forwardRef<HTMLButtonElement, KeyProps>(
    (props, ref) => {
        const [colorState, setColorState] = useState<string>("");

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
            <button
                id={props.particle}
                ref={ref}
                onClick={answerHandler}
                className={s["key"]}
                type="button"
                disabled={props.isPostAnswer}
                data-particle={props.particle}
                data-state={colorState}
            >
                <span>{props.particle}</span>
            </button>
        );
    }
);
Key.displayName = "Key";

export default Keyboard;
