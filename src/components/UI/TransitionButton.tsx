import { useEffect, useState } from "react";

import { ButtonColorNames } from "./Button";
import Icon, { IconName } from "./Icon/Icon";

import s from "./UI.module.scss";

interface Props {
    onClick: () => void;
    preText: string;
    postText?: string;
    color: ButtonColorNames;
    icon?: IconName;
}

let transitionTimer: any;

const TransitionButton: React.FC<Props> = (props) => {
    const [btnIsTransitioning, setBtnIsTransitioning] = useState(false);

    const clickHandler = () => {
        setBtnIsTransitioning(true);

        props.onClick();

        transitionTimer = setTimeout(() => {
            setBtnIsTransitioning(false);
        }, 2000);
    };

    // Clear timer
    useEffect(() => {
        return () => clearTimeout(transitionTimer);
    }, []);

    let textContent = props.preText;
    if (btnIsTransitioning && props.postText) {
        textContent = props.postText;
    }

    return (
        <button
            className={`
                ${s["button"]}
                ${props.color && s[`button--${props.color}`]}
                ${btnIsTransitioning && s[`button--transitioning`]}
            `}
            onClick={clickHandler}
        >
            <span className={s["button__text"]}>{textContent}</span>
            {props.icon && (
                <span className={s["button__icon"]}>
                    <Icon name={props.icon} />
                </span>
            )}
        </button>
    );
};

export default TransitionButton;
