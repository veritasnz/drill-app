import { useEffect, useState } from "react";
import { rubifyQuestionText } from "../../lib/question-parser";
import Question from "../../models/Question.model";

import s from "./Drill.module.scss";
import PlaceholderWrap from "./PlaceholderWrap";

/**
 * Key
 */
interface Props {
    question: Question;
    isPostAnswer: boolean;
}

const QuestionText: React.FC<Props> = ({ question, isPostAnswer }) => {
    const [firstHalf, setFirstHalf] = useState<JSX.Element>(<></>);
    const [secondHalf, setSecondHalf] = useState<JSX.Element>(<></>);
    const [placeholderContent, setPlaceholderContent] = useState<string[]>([]);

    // Update text on question change
    useEffect(() => {
        const [newFirstHalf, newSecondHalf] = rubifyQuestionText(
            question.question
        );

        setFirstHalf(newFirstHalf);
        setSecondHalf(newSecondHalf);
    }, [question]);

    // Update placeholder when 'isPostAnswer' changes
    useEffect(() => {
        if (isPostAnswer) {
            let isFirst = true;
            const newPlaceholderContent = question.answers.map((answer) => {
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
    }, [isPostAnswer, question.answers]);

    return (
        <p className={s["question__text"]}>
            {firstHalf}
            <PlaceholderWrap
                isPostAnswer={isPostAnswer}
                content={placeholderContent}
            />
            {secondHalf}
        </p>
    );
};

export default QuestionText;
