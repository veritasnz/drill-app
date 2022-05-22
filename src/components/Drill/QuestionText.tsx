import { useEffect, useState } from "react";
import { rubifyQuestionText } from "../../lib/question-parser";
import Question from "../../models/Question.model";

import s from "./Drill.module.scss";

/**
 * Key
 */
interface Props {
    nextQuestion: Question;
    isPostAnswer: boolean;
}

const QuestionText: React.FC<Props> = ({ nextQuestion, isPostAnswer }) => {
    const [firstHalf, setFirstHalf] = useState<JSX.Element>(<></>);
    const [secondHalf, setSecondHalf] = useState<JSX.Element>(<></>);
    const [placeholderContent, setPlaceholderContent] = useState<string[]>([]);

    // Update text on question change
    useEffect(() => {
        const [newFirstHalf, newSecondHalf] = rubifyQuestionText(
            nextQuestion.question
        );

        setFirstHalf(newFirstHalf);
        setSecondHalf(newSecondHalf);
    }, [nextQuestion]);

    // Update placeholder when 'isPostAnswer' changes
    useEffect(() => {
        if (isPostAnswer) {
            let isFirst = true;
            const newPlaceholderContent = nextQuestion.answers.map((answer) => {
                if (isFirst) {
                    isFirst = false;
                    return answer;
                } else {
                    return `・${answer}`;
                }
            });
            setPlaceholderContent(newPlaceholderContent);
        } else {
            setPlaceholderContent([""]);
        }
    }, [isPostAnswer, nextQuestion.answers]);

    return (
        <p className={s["question__text"]}>
            {firstHalf}
            <span className={`${s["question__place-wrap"]}`}>
                <span
                    className={`${s["question__place-inner"]} ${
                        isPostAnswer && s["question__place-inner--correct"]
                    }`}
                >
                    {placeholderContent}
                </span>
            </span>
            {secondHalf}
        </p>
    );
};

export default QuestionText;
