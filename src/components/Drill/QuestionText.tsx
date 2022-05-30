import { useEffect, useState } from "react";

// Lib
import {
    rubifyQuestionText,
    stringifyAnswerParticles,
} from "../../lib/question-parser";

// Models
import Question from "../../models/Question.model";

// Components
import PlaceholderWrap from "./PlaceholderWrap";

import s from "./Drill.module.scss";

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
    const [placeholderContent, setPlaceholderContent] = useState<string>("");

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
            setPlaceholderContent(stringifyAnswerParticles(question.answers));
        } else {
            setPlaceholderContent("");
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
