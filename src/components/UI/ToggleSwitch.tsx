import s from "./UI.module.scss";

interface Props {
    onToggle: () => void;
    stateVar: boolean;
}

const ToggleSwitch: React.FC<Props> = (props) => {
    return (
        <div className={s["toggle-switch"]}>
            <input
                type="checkbox"
                checked={props.stateVar}
                onChange={props.onToggle}
            />
            <span className={s["switch"]} />
        </div>
    );
};

export default ToggleSwitch;
