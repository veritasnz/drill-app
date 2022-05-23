import { useEffect, useState } from "react";
import { rubifyQuestionText } from "../../lib/question-parser";
import Question from "../../models/Question.model";

import s from "./Drill.module.scss";
import PlaceholderWrap from "./PlaceholderWrap";

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
            <PlaceholderWrap
                isPostAnswer={isPostAnswer}
                content={placeholderContent}
            />
            {secondHalf}
        </p>
    );
};

export default QuestionText;
