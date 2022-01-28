export const sentenceToFurigana: (s: string) => JSX.Element = (
    sentence: string
) => {
    // return words.map(function (word) {
    //     var bits = word.split(/(.)\[([^\]]*)\]/);

    //     while (bits.length > 1) {
    //         if (options["kana"]) {
    //             bits[0] = bits[0] + bits[2] + bits[3];
    //         } else if (options["furigana_always"]) {
    //             bits[0] =
    //                 bits[0] +
    //                 "<ruby>" +
    //                 bits[1] +
    //                 "<rp>(</rp><rt>" +
    //                 bits[2] +
    //                 "</rt><rp>)</rp></ruby>" +
    //                 bits[3];
    //         } else {
    //             bits[0] =
    //                 bits[0] +
    //                 "<ruby class='furiganaHover'>" +
    //                 bits[1] +
    //                 "<rp>(</rp><rt>" +
    //                 bits[2] +
    //                 "</rt><rp>)</rp></ruby>" +
    //                 bits[3];
    //         }
    //         bits.splice(1, 3);
    //     }

    //     return bits[0];
    // });

    return <p>test</p>;
};
