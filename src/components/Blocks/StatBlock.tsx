import s from "./Blocks.module.scss";

interface Props {
    title: string;
    description?: string;
    children: React.ReactNode;
}

const StatBlock: React.FC<Props> = (props) => {
    return (
        <div className={s["stat-block"]}>
            <div className={s["stat-block__title"]}>
                <h3>{props.title}</h3>
                {props.description && <p>{props.description}</p>}
            </div>
            <p className={s["stat-block__cont"]}>{props.children}</p>
        </div>
    );
};

export default StatBlock;
