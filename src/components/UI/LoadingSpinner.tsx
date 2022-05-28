import s from "./UI.module.scss";

interface Props {}

const LoadingSpinner: React.FC<Props> = (props) => {
    return (
        <div className={s["spinner"]}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    r="35"
                    strokeDasharray="165 57"
                />
            </svg>
        </div>
    );
};

export default LoadingSpinner;
