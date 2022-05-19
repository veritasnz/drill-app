import ToggleSwitch from "../UI/ToggleSwitch";
import s from "./Blocks.module.scss";

interface Props {
    title: string;
    description: string;
    stateVar: boolean;
    onToggle: () => void;
}

const ToggleBlock: React.FC<Props> = (props) => {
    return (
        <div className={s["toggle-block"]}>
            <div className={s["toggle-block__inp"]}>
                <ToggleSwitch
                    stateVar={props.stateVar}
                    onToggle={props.onToggle}
                />
            </div>
            <div className={s["toggle-block__cont"]}>
                <h3 className={s["toggle-block__tit"]}>{props.title}</h3>
                <p className={s["toggle-block__text"]}>{props.description}</p>
            </div>
        </div>
    );
};

export default ToggleBlock;
