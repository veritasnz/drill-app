import React, { useEffect, useRef, useState } from "react";

import ParticleEnum from "../../models/ParticleEnum.model";
import useKeyPress from "../../hooks/useKeyPress";

import s from "./Drill.module.scss";

interface KeyBoardProps {
    isPostAnswer: boolean;
    onAttempt: (answerEnum: ParticleEnum) => boolean;
}

type KeyRefsType = { [key: string]: HTMLButtonElement };

const particleKeyPairs: [ParticleEnum, string[]][] = [
    [ParticleEnum.HA, ["KeyH", "KeyA"]],
    [ParticleEnum.GA, ["KeyG", "KeyA"]],
    [ParticleEnum.DE, ["KeyD", "KeyE"]],
    [ParticleEnum.TO, ["KeyT", "KeyO"]],
    [ParticleEnum.NI, ["KeyN", "KeyI"]],
    [ParticleEnum.NO, ["KeyN", "KeyO"]],
    [ParticleEnum.HE, ["KeyH", "KeyE"]],
    [ParticleEnum.WO, ["KeyW", "KeyO"]],
    [ParticleEnum.KARA, ["KeyK", "KeyA"]],
    [ParticleEnum.MADE, ["KeyM", "KeyA"]],
];

// Key buffering vars
const KEYSTROKE_DELAY = 1000;
let lastStrokeTime = Date.now();
let keystrokeBuffer: string[] = [];

const Keyboard: React.FC<KeyBoardProps> = ({ isPostAnswer, onAttempt }) => {
    const keyRefs = useRef<KeyRefsType>({});

    //Set up buffered keyboard input handler
    const keyInputHandler = (event: KeyboardEvent) => {
        const currStrokeTime = Date.now();

        // If last press is old, reset buffer
        if (currStrokeTime - lastStrokeTime > KEYSTROKE_DELAY) {
            keystrokeBuffer = [];
        }

        // Push new key and reset timer
        keystrokeBuffer.push(event.code);
        lastStrokeTime = currStrokeTime;

        // Force buffer length to be 2
        while (keystrokeBuffer.length > 2) keystrokeBuffer.shift();

        // Check if buffer matches particle
        particleKeyPairs.every((currPair) => {
            // Doesn't match at all. Continue
            if (currPair[1][0] !== keystrokeBuffer[0]) return true;

            // One key entered, it matches. Focus & exit
            if (typeof keystrokeBuffer[1] === "undefined") {
                keyRefs.current[currPair[0]].focus();
                return false;
            }

            // Two keys entered, only first matches. Continue
            if (currPair[1][1] !== keystrokeBuffer[1]) return true;

            // Two keys entered, both match. Focus & exit
            keyRefs.current[currPair[0]].focus();
            return false;
        });
    };

    // Assign keyInputHandler to particle keys
    useKeyPress(
        particleKeyPairs.flatMap((currPair) => currPair[1]),
        keyInputHandler
    );

    // Build Keys for render
    const keysArray: JSX.Element[] = [];
    particleKeyPairs.forEach((currPair) => {
        keysArray.push(
            <Key
                key={currPair[0]}
                onAttempt={onAttempt}
                particle={currPair[0]}
                isPostAnswer={isPostAnswer}
                // Assign refs to buttons dynamically
                ref={(el: HTMLButtonElement) =>
                    (keyRefs.current[currPair[0]] = el)
                }
            />
        );
    });

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
