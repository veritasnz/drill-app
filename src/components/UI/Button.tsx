import React from "react";

import Icon, { IconName } from "./Icon/Icon";

import s from "./UI.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: ButtonColorNames;
    icon?: IconName;
    [key: string]: any;
}

export type ButtonColorNames = "blue" | "orange" | "red" | "green";

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
    return (
        <button
            ref={ref}
            className={`
                ${s["button"]}
                ${props.color && s[`button--${props.color}`]}
                ${props.className}
            `}
            onClick={props.onClick}
            disabled={props.disabled ? true : false}
            {...props}
        >
            <span className={s["button__text"]}>{props.children}</span>
            {props.icon && (
                <span className={s["button__icon"]}>
                    <Icon name={props.icon} />
                </span>
            )}
        </button>
    );
});

export default Button;
