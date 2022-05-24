import React from "react";

import Icon, { IconName } from "./Icon/Icon";

import s from "./UI.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: ButtonColorNames;
    icon?: IconName;
}

export type ButtonColorNames =
    | "blue"
    | "orange"
    | "red"
    | "green"
    | "green-next";

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
    const { color, icon, children, className, onClick, ...otherProps } = props;

    return (
        <button
            ref={ref}
            className={`
                ${s["button"]}
                ${color && s[`button--${color}`]}
                ${className}
            `}
            onClick={onClick}
            disabled={props.disabled ? true : false}
            {...otherProps}
        >
            <span className={s["button__text"]}>{children}</span>
            {icon && (
                <span className={s["button__icon"]}>
                    <Icon name={icon} />
                </span>
            )}
        </button>
    );
});
Button.displayName = "Button";

export default Button;
