import Icon, { IconName } from "./Icon/Icon";

import s from "./UI.module.scss";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    color: ButtonColorNames;
    icon?: IconName;
}

export type ButtonColorNames = "blue" | "orange" | "red" | "green";

const Button: React.FC<Props> = (props) => {
    return (
        <button
            className={`
                ${s["button"]}
                ${props.color && s[`button--${props.color}`]}
            `}
            onClick={props.onClick}
        >
            <span className={s["button__text"]}>{props.children}</span>
            {props.icon && (
                <span className={s["button__icon"]}>
                    <Icon name={props.icon} />
                </span>
            )}
        </button>
    );
};

export default Button;
