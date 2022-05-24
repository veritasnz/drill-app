import s from "./Blocks.module.scss";

interface Props {
    children: React.ReactNode;
}

const Prose: React.FC<Props> = (props) => {
    return <div className={s["prose"]}>{props.children}</div>;
};

export default Prose;
