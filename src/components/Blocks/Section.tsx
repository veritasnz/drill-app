import s from "./Blocks.module.scss";

interface Props {
    children: React.ReactNode;
}

const Section: React.FC<Props> = (props) => {
    return <section className={s["section"]}>{props.children}</section>;
};

export default Section;
