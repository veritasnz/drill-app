import fs from "fs";
import ReactDOMServer from "react-dom/server";

import Question from "../../models/Question.model";

import {
    rubifyQuestionText,
    stringifyAnswerParticles,
} from "../question-parser";

/**
 * Loops through all questions and turns their text into MP3 files inside of '/public/audio/'
 */
export default function buildQuestionMap(allQuestions: Question[]) {
    const QuestionMapPage = () => {
        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <title>Wonideto Question Map</title>
                </head>
                <body
                    style={{
                        fontFamily: "sans-serif",
                    }}
                >
                    <h1>Wonideto Question Map</h1>
                    <ol>
                        {allQuestions.map((question) => {
                            const [firstHalfContent, secondHalfContent] =
                                rubifyQuestionText(question.question);

                            const answerContent = stringifyAnswerParticles(
                                question.answers
                            );

                            return (
                                <li key={question.id}>
                                    <p>
                                        <span>
                                            {firstHalfContent}
                                            <span
                                                style={{
                                                    color: "#f85672",
                                                }}
                                            >
                                                （{answerContent}）
                                            </span>
                                            {secondHalfContent}
                                        </span>
                                        <br />
                                        <span>{question.english}</span>
                                    </p>
                                </li>
                            );
                        })}
                    </ol>
                </body>
            </html>
        );
    };

    // Render and write to file
    let html = ReactDOMServer.renderToStaticMarkup(<QuestionMapPage />);
    const htmlWDoc = "<!DOCTYPE html>" + html;
    const outputFile = "public/question-map.html";
    fs.writeFileSync(outputFile, htmlWDoc);
    console.log(`Wrote ${outputFile}`);
}
