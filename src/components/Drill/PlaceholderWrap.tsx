import s from "./Drill.module.scss";

interface Props {
    isPostAnswer?: boolean;
    content?: string[];
}

const PlaceholderWrap: React.FC<Props> = (props) => {
    // else print with content
    return (
        <span
            className={`${s["question__place-wrap"]} ${
                props.isPostAnswer && s["question__place-wrap--correct"]
            }`}
        >
            <span className={`${s["question__place-inner"]}`}>
                {props.content}
            </span>
        </span>
    );
};

export default PlaceholderWrap;
