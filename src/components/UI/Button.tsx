import s from "./UI.module.scss";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<Props> = (props) => {
    return (
        <button className={s["button"]} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;
