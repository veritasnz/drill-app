import s from "./Drill.module.scss";

interface Props {
    isPostAnswer?: boolean;
    content?: string[];
}

const DrillEmpty: React.FC<Props> = (props) => {
    return <p className={s["empty"]}>Finished! Choose next level</p>;
};

export default DrillEmpty;
