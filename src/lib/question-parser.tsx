import s from "../components/Drill/Drill.module.scss";
import ParticleEnum from "../models/ParticleEnum.model";

/**
 * Takes in a question and spits out JSX for before/after underscore
 * @param sentence
 * @returns {[JSX.Element, JSX.Element]}
 */
export const rubifyQuestionText: (
    sentence: string
) => [JSX.Element, JSX.Element] = (sentence: string) => {
    const [firstHalfString, secondHalfString] =
        splitUnderscoreSentence(sentence);

    const firstHalfJSX = rubifyText(firstHalfString);
    const secondHalfJSX = rubifyText(secondHalfString);

    return [firstHalfJSX, secondHalfJSX];
};

/**
 * Rubifies a sentence and returns the JSX
 * @param sentence
 * @returns {JSX.Element}
 */
const rubifyText: (sentence: string) => JSX.Element = (sentence: string) => {
    const splitSentence = splitNoUnderscoreSentence(sentence);

    return (
        <>
            {splitSentence?.map((bit) => {
                if (!bit) return null;

                const randKey = Math.random() * 1000;

                if (bit[0] === "{") {
                    // If kanji /w furigana, build ruby
                    return <span key={randKey}>{buildRuby(bit)}</span>;
                } else if (bit[0] === "?") {
                    // If is another placeholder in same question
                    return (
                        <span
                            key={randKey}
                            className={s["question__place-wrap"]}
                        >
                            <span className={s["question__place-inner"]}></span>
                        </span>
                    );
                } else {
                    // Else, is non-kanji content, straight push
                    return <span key={randKey}>{bit}</span>;
                }
            })}
        </>
    );
};

/**
 * Builds a 'ruby' element
 * @param text
 * @returns
 */
const buildRuby: (text: string) => JSX.Element = (text: string) => {
    const [kanji, furigana] = matchAndCleanKanjiFuriganaPair(text);

    return (
        <ruby>
            {kanji}
            <rp>(</rp>
            <rt>{furigana}</rt>
            <rp>)</rp>
        </ruby>
    );
};

/**
 * Parses Japanese question text so it is readable by Text-To-Speech API
 * @param sentence
 * @returns {string}
 */
export const parseQuestionTextForTTS: (
    sentence: string,
    particle: ParticleEnum
) => string = (sentence, particle) => {
    const [firstHalfString, secondHalfString] =
        splitUnderscoreSentence(sentence);

    const firstHalfSplit = splitNoUnderscoreSentence(firstHalfString);
    const secondHalfSplit = splitNoUnderscoreSentence(secondHalfString);

    const fullSplitSentence = firstHalfSplit.concat(particle, secondHalfSplit);

    const parsedQuestionText = fullSplitSentence.reduce((result, bit) => {
        let textToAdd = "";

        if (bit) {
            if (bit[0] === "{") {
                // If kanji /w furigana pair, drop furigana and strip braces on Kanji
                textToAdd = matchAndCleanKanjiFuriganaPair(bit)[0];
            } else if (bit[0] === "?") {
                // If is another placeholder in same question
                textToAdd = "〇〇";
            } else {
                // Else, is non-kanji content, straight push
                textToAdd = bit;
            }
        }

        return result + textToAdd;
    });

    return parsedQuestionText;
};

/**
 * Strips the braces off the start and end of a string
 * E.g. '{自分}' becomes '自分', and りんご becomes 'りんご'
 * @param text
 * @returns {string}
 */
const stripBraces: (text: string) => string = (text: string) => {
    return text.substring(1, text.length - 1);
};

/**
 * Splits text that (potentially) has kanji/furigana.
 * Dones't split text that has underscores
 * @param text
 * @returns {string[]}
 */
const splitNoUnderscoreSentence: (text: string) => string[] = (
    text: string
) => {
    const REGEX_WITH_CURLED_AND_NORMAL_BRACES = new RegExp(
        /(\{[^\}]*\}\([^\)]*\))|(\?)/,
        "gi"
    );
    return text.split(REGEX_WITH_CURLED_AND_NORMAL_BRACES);
};

/**
 * Splits text that has underscores into two
 * @param text
 * @returns {[string, string]}
 */
const splitUnderscoreSentence: (text: string) => [string, string] = (
    text: string
) => {
    const REGEX_UNDERSCORE = new RegExp(/_/, "g");
    return text.split(REGEX_UNDERSCORE) as [string, string];
};

/**
 * Splits kanji/furigana pair into text without braces
 * @param text
 * @returns {String[]} Clean [kanji, furigana] pair
 */
const matchAndCleanKanjiFuriganaPair: (text: string) => [string, string] = (
    text: string
) => {
    const REGEX_WITHOUT_CURLED_AND_NORMAL_BRACES = new RegExp(
        /(\((.+?)\))|(\{(.+?)\})/,
        "gi"
    );

    const [kanji, furigana] = text.match(
        REGEX_WITHOUT_CURLED_AND_NORMAL_BRACES
    ) as [string, string];

    return [stripBraces(kanji), stripBraces(furigana)];
};
