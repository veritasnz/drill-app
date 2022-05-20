import ParticleEnum from "../src/models/ParticleEnum.model";
import Stage from "../src/models/Stage.model";

/**
 * Stores all stage, level and question data.
 * Temporary – to be replaced by database + API at some point
 *
 * Question text symbol legend:
 * -    {}() → Kanji/furigana pair
 * -    _ → Current question marker
 * -    ? → Future question markers
 */
const drillData: Stage[] = [
    {
        id: "dragon-ball",
        name: "Dragon Ball",
        difficulty: "~N4/N5",
        levels: [
            {
                id: "yajirobe",
                name: "Yajirobe",
                questions: [
                    {
                        id: "yajirobe-long-1",
                        question:
                            "{自分}(じぶん)_{人}(ひと)?プレゼント?{上}(あ)げる",
                        answers: [ParticleEnum.KARA],
                        english: "To give a person a present from yourself",
                    },
                    {
                        id: "yajirobe-long-2",
                        question:
                            "{自分}(じぶん)から{人}(ひと)_プレゼント?{上}(あ)げる",
                        answers: [ParticleEnum.NI, ParticleEnum.HE],
                        english: "To give a person a present from yourself",
                    },
                    {
                        id: "yajirobe-long-3",
                        question:
                            "{自分}(じぶん)から{人}(ひと)にプレゼント_{上}(あ)げる",
                        answers: [ParticleEnum.WO],
                        english: "To give a person a present from yourself",
                    },
                    {
                        id: "yajirobe-apple",
                        question: "{林檎}(りんご)_{食}(た)べる",
                        answers: [ParticleEnum.WO],
                        english: "To eat an apple",
                    },
                    {
                        id: "yajirobe-park",
                        question: "{公園}(こうえん)_{行}(い)く",
                        answers: [ParticleEnum.NI, ParticleEnum.HE],
                        english: "To go to the park",
                    },
                    {
                        id: "yajirobe-friends",
                        question: "{友達}(ともだち)_{遊}(あそ)ぶ",
                        answers: [ParticleEnum.TO],
                        english: "To play with friends",
                    },
                    {
                        id: "yajirobe-train",
                        question: "{電車}(でんしゃ)_{乗}(の)る",
                        answers: [ParticleEnum.NI],
                        english: "To ride the train",
                    },
                ],
            },
            {
                id: "krillin",
                name: "Krillin",
                questions: [
                    {
                        id: "krillin-test",
                        question: "テスト_{行}(おこな)います",
                        answers: [ParticleEnum.WO],
                        english: "To carry out a test",
                    },
                ],
            },
            {
                id: "roshi",
                name: "Master Roshi",
                questions: [
                    {
                        id: "roshi-test",
                        question: "テスト_{行}(おこな)います",
                        answers: [ParticleEnum.WO],
                        english: "To carry out a test",
                    },
                ],
            },
            {
                id: "tien-shinhan",
                name: "Tien Shinhan",
                questions: [
                    {
                        id: "tien-test",
                        question: "テスト_{行}(おこな)います",
                        answers: [ParticleEnum.WO],
                        english: "To carry out a test",
                    },
                ],
            },
            {
                id: "piccolo",
                name: "Piccolo",
                questions: [
                    {
                        id: "piccolo-test",
                        question: "テスト_{行}(おこな)います",
                        answers: [ParticleEnum.WO],
                        english: "To carry out a test",
                    },
                ],
            },
        ],
    },
    {
        id: "saiyan-saga",
        name: "Saiyan Saga",
        difficulty: "~N3",
        levels: [
            {
                id: "farmer",
                name: "Farmer",
                questions: [
                    {
                        id: "farmer-test",
                        question: "テスト_{行}(おこな)います",
                        answers: [ParticleEnum.WO],
                        english: "To carry out a test",
                    },
                ],
            },
            {
                id: "raditz",
                name: "Raditz",
                questions: [
                    {
                        id: "raditz-test",
                        question: "テスト_{行}(おこな)います",
                        answers: [ParticleEnum.WO],
                        english: "To carry out a test",
                    },
                ],
            },
            {
                id: "saibaman",
                name: "Saibaman",
                questions: [
                    {
                        id: "saibaman-test",
                        question: "テスト_{行}(おこな)います",
                        answers: [ParticleEnum.WO],
                        english: "To carry out a test",
                    },
                ],
            },
            {
                id: "nappa",
                name: "Nappa",
                questions: [
                    {
                        id: "nappa-test",
                        question: "テスト_{行}(おこな)います",
                        answers: [ParticleEnum.WO],
                        english: "To carry out a test",
                    },
                ],
            },
            {
                id: "vegeta",
                name: "Vegeta",
                questions: [
                    {
                        id: "vegeta-test",
                        question: "テスト_{行}(おこな)います",
                        answers: [ParticleEnum.WO],
                        english: "To carry out a test",
                    },
                ],
            },
        ],
    },
];

export default drillData;
