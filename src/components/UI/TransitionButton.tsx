import React, { useEffect, useState } from "react";

import { ButtonColorNames } from "./Button";
import Icon, { IconName } from "./Icon/Icon";

import s from "./UI.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    preText: string;
    postText?: string;
    color: ButtonColorNames;
    icon?: IconName;
}

let transitionTimer: any;

/**
 * Just like a regular < Button >, but switches appearance for a few seconds
 * on click. Switches to green, preText changes to postText, and icon spins
 */
const TransitionButton: React.FC<Props> = React.forwardRef<
    HTMLButtonElement,
    Props
>((props, ref) => {
    const {
        onClick,
        preText,
        postText,
        color,
        icon,
        disabled,
        className,
        ...otherProps
    } = props;

    const [btnIsTransitioning, setBtnIsTransitioning] = useState(false);

    // Handler that wraps onClick. Handles the transition
    const clickHandler = () => {
        setBtnIsTransitioning(true);

        onClick();

        transitionTimer = setTimeout(() => {
            setBtnIsTransitioning(false);
        }, 2000);
    };

    // Clear transition timer
    useEffect(() => {
        return () => clearTimeout(transitionTimer);
    }, []);

    // Prep display text
    let textContent = preText;
    if (btnIsTransitioning && postText) textContent = postText;

    return (
        <button
            ref={ref}
            className={`
                ${s["button"]}
                ${color && s[`button--${color}`]}
                ${btnIsTransitioning && s[`button--transitioning`]}
                ${className}
            `}
            onClick={clickHandler}
            {...otherProps}
        >
            <span className={s["button__text"]}>{textContent}</span>
            {props.icon && (
                <span className={s["button__icon"]}>
                    <Icon name={props.icon} />
                </span>
            )}
        </button>
    );
});
TransitionButton.displayName = "TransitionButton";

export default TransitionButton;
