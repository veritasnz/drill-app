import s from "./UI.module.scss";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    color: ButtonColorNames;
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
        </button>
    );
};

export default Button;
