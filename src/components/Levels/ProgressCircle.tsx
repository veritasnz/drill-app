import s from "./Levels.module.scss";

interface Props {
    percentage: number;
    levelNum: number;
}

const ProgressCircle: React.FC<Props> = ({ percentage, levelNum }) => {
    return (
        <div className={s["progress-circle"]}>
            <div className={s["progress-circle__num"]}>{levelNum}</div>
            <svg className={s["progress-circle__bar"]} viewBox="0 0 36 36">
                <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--c-grey-light)"
                    strokeWidth="3"
                />
                {percentage > 0 && (
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--c-blue)"
                        strokeWidth="3"
                        strokeDasharray={`${percentage}, 100`}
                        strokeLinecap="round"
                    />
                )}
            </svg>
        </div>
    );
};

export default ProgressCircle;
