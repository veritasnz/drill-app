const REGEX_WITH_CURLED_AND_NORMAL_BRACES = new RegExp(
    /(\{[^\}]*\}\([^\)]*\))/,
    "gi"
);
const REGEX_WITHOUT_CURLED_AND_NORMAL_BRACES = new RegExp(
    /(\((.+?)\))|(\{(.+?)\})/,
    "gi"
);
const REGEX_UNDERSCORE = new RegExp(/_/, "g");

export const rubifyDrillQuestion: (
    sentence: string
) => [JSX.Element, JSX.Element] = (sentence: string) => {
    const [firstHalfString, secondHalfString] =
        sentence.split(REGEX_UNDERSCORE);

    const firstHalfJSX = rubifyText(firstHalfString);
    const secondHalfJSX = rubifyText(secondHalfString);

    return [firstHalfJSX, secondHalfJSX];
};

const rubifyText: (sentence: string) => JSX.Element = (sentence: string) => {
    return (
        <>
            {sentence.split(REGEX_WITH_CURLED_AND_NORMAL_BRACES)?.map((bit) => {
                if (bit === "") return null;
                if (bit[0] === "{") {
                    // If ruby
                    return (
                        <span key={Math.random() * 1000}>{buildRuby(bit)}</span>
                    );
                } else {
                    // Else straight push
                    return <span key={Math.random() * 1000}>{bit}</span>;
                }
            })}
        </>
    );
};

const buildRuby: (text: string) => JSX.Element = (text: string) => {
    const splitText = text.match(
        REGEX_WITHOUT_CURLED_AND_NORMAL_BRACES
    ) as Array<string>;

    const kanji = stripBraces(splitText[0]);
    const furigana = stripBraces(splitText[1]);

    return (
        <ruby>
            {kanji}
            <rp>(</rp>
            <rt>{furigana}</rt>
            <rp>)</rp>
        </ruby>
    );
};

const stripBraces: (text: string) => string = (text: string) => {
    return text.substring(1, text.length - 1);
};
