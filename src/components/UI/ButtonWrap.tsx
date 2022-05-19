import s from "./UI.module.scss";

interface Props {
    children: React.ReactNode;
}

const ButtonWrap: React.FC<Props> = (props) => {
    return <section className={s["button-wrap"]}>{props.children}</section>;
};

export default ButtonWrap;
