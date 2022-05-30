import fs from "fs";
import ReactDOMServer from "react-dom/server";

import Question from "../../models/Question.model";

import { rubifyQuestionText } from "../question-parser";

/**
 * Loops through all questions and turns their text into MP3 files inside of '/public/audio/'
 */
export default function buildQuestionMap(allQuestions: Question[]) {
    // if (process.env.NODE_ENV == "production") {

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

                                let isFirst = true;
                                const answerContent = question.answers.map(
                                    (answer) => {
                                        if (isFirst) {
                                            isFirst = false;
                                            return answer;
                                        } else {
                                            return `・${answer}`;
                                        }
                                    }
                                );

                                return (
                                    <li>
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

    // Render
    let html = ReactDOMServer.renderToStaticMarkup(<QuestionMapPage />);
    const htmlWDoc = "<!DOCTYPE html>" + html;
    const outputFile = "public/question-map.html";
    fs.writeFileSync(outputFile, htmlWDoc);
    console.log(`Wrote ${outputFile}`);
    // }
}
