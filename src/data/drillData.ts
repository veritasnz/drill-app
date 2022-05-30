import ParticleEnum from "../models/ParticleEnum.model";
import Stage from "../models/Stage.model";

/**
 * Stores all stage, level and question data.
 * Temporary – to be replaced by database + API at some point
 *
 * Question text symbol legend:
 * -    {}() → Kanji/furigana pair
 * -    _ → Current question marker
 * -    ? → Future question markers
 */

const dragonBallStage: Stage = {
    id: "dragon-ball",
    name: "Dragon Ball",
    difficulty: "~N4/N5",
    levels: [
        {
            id: "yajirobe",
            name: "Yajirobe",
            questions: [
                {
                    id: "have-a-pen-1",
                    question: "{私}(わたし)_ペン?ある",
                    answers: [ParticleEnum.HA],
                    english: "I have a pen",
                },
                {
                    id: "have-a-pen-2",
                    question: "{私}(わたし)はペン_ある",
                    answers: [ParticleEnum.GA],
                    english: "I have a pen",
                },
                {
                    id: "wear-a-coat",
                    question: "{上着}(うわぎ)_{着}(き)る",
                    answers: [ParticleEnum.WO],
                    english: "To wear a coat",
                },
                {
                    id: "lend-an-umbrella",
                    question: "{傘}(かさ)_{貸}(か)す",
                    answers: [ParticleEnum.WO],
                    english: "To lend an umbrella",
                },
                {
                    id: "go-to-school",
                    question: "{学校}(がっこう)_{行}(い)く",
                    answers: [ParticleEnum.NI, ParticleEnum.HE],
                    english: "To go to school",
                },
                {
                    id: "read-a-magazine",
                    question: "{雑誌}(ざっし)_{読}(よ)む",
                    answers: [ParticleEnum.WO],
                    english: "To read a magazine",
                },
            ],
        },
        {
            id: "krillin",
            name: "Krillin",
            questions: [
                {
                    id: "smoke-a-cigarette",
                    question: "タバコ_{吸}(す)う",
                    answers: [ParticleEnum.WO],
                    english: "To smoke a cigarette/cigarettes",
                },
                {
                    id: "live-in-tokyo",
                    question: "{東京}(とうきょう)_{住}(す)む",
                    answers: [ParticleEnum.NI],
                    english: "To live in Tokyo",
                },
                {
                    id: "work-for-a-bank",
                    question: "{銀行}(ぎんこう)_{勤}(つと)める",
                    answers: [ParticleEnum.NI],
                    english: "To work for a bank",
                },
                {
                    id: "walk-in-the-garden",
                    question: "{庭}(にわ)_{歩}(ある)く",
                    answers: [ParticleEnum.WO],
                    english: "To walk in the garden",
                },
                {
                    id: "ride-a-train",
                    question: "{電車}(でんしゃ)_{乗}(の)る",
                    answers: [ParticleEnum.NI],
                    english: "To ride a train",
                },
            ],
        },
        {
            id: "roshi",
            name: "Master Roshi",
            questions: [
                {
                    id: "send-a-letter",
                    question: "{手紙}(てがみ)_{送}(おく)る",
                    answers: [ParticleEnum.WO],
                    english: "To send a letter",
                },
                {
                    id: "climb-a-mountain",
                    question: "{山}(やま)_{登}(のぼ)る",
                    answers: [ParticleEnum.NI, ParticleEnum.WO],
                    english: "To climb a mountain",
                },
                {
                    id: "forget-ones-homework",
                    question: "{宿題}(しゅくだい)_{忘}(わす)れる",
                    answers: [ParticleEnum.WO],
                    english: "To forget (one’s) homework",
                },
                {
                    id: "baby-to-be-born",
                    question: "{赤}(あか)ちゃん_{生}(う)まれる",
                    answers: [ParticleEnum.GA],
                    english: "For a baby to be born",
                },
                {
                    id: "eat-with-chopsticks-1",
                    question: "{箸}(はし)_ご{飯}(はん)?{食}(た)べる",
                    answers: [ParticleEnum.DE],
                    english: "To eat with chopsticks",
                },
                {
                    id: "eat-with-chopsticks-2",
                    question: "{箸}(はし)でご{飯}(はん)_{食}(た)べる",
                    answers: [ParticleEnum.WO],
                    english: "To eat with chopsticks",
                },
            ],
        },
        {
            id: "tien-shinhan",
            name: "Tien Shinhan",
            questions: [
                {
                    id: "call-me-machan-1",
                    question: "{私}(わたし)_まっちゃん?{呼}(よ)ぶ",
                    answers: [ParticleEnum.WO, ParticleEnum.HA],
                    english: "To call me Ma-chan",
                },
                {
                    id: "call-me-machan-2",
                    question: "{私}(わたし)をまっちゃん_{呼}(よ)ぶ",
                    answers: [ParticleEnum.TO],
                    english: "To call me Ma-chan",
                },
                {
                    id: "speak-in-english",
                    question: "{英語}(えいご)_{話}(はな)す",
                    answers: [ParticleEnum.DE, ParticleEnum.WO],
                    english: "To speak (in) English",
                },
                {
                    id: "catch-a-cold",
                    question: "{風邪}(かぜ)_{引}(ひ)く",
                    answers: [ParticleEnum.WO],
                    english: "To catch a cold",
                },
                {
                    id: "fall-ill",
                    question: "{病気}(びょうき)_なる",
                    answers: [ParticleEnum.NI],
                    english: "To fall ill",
                },
                {
                    id: "take-off-clothes",
                    question: "{服}(ふく)_{脱}(ぬ)ぐ",
                    answers: [ParticleEnum.WO],
                    english: "To take off one’s clothes",
                },
            ],
        },
        {
            id: "piccolo",
            name: "Piccolo",
            questions: [
                {
                    id: "go-park-with-friend-1",
                    question: "{友達}(ともだち)_{公園}(こうえん)?{行}(い)く",
                    answers: [ParticleEnum.TO],
                    english: "To go to the park with a friend",
                },
                {
                    id: "go-park-with-friend-2",
                    question: "{友達}(ともだち)と{公園}(こうえん)_{行}(い)く",
                    answers: [ParticleEnum.NI, ParticleEnum.HE],
                    english: "To go to the park with a friend",
                },
                {
                    id: "turn-right-at-intersection-1",
                    question: "{交差点}(こうさてん)_{右}(みぎ)?{曲}(ま)がる",
                    answers: [ParticleEnum.WO],
                    english: "To turn right at the intersection",
                },
                {
                    id: "turn-right-at-intersection-2",
                    question: "{交差点}(こうさてん)を{右}(みぎ)_{曲}(ま)がる",
                    answers: [ParticleEnum.NI, ParticleEnum.HE],
                    english: "To turn right at the intersection",
                },
                {
                    id: "cross-river-with-boat-1",
                    question: "{船}(ふね)_{川}(かわ)?{渡}(わた)る",
                    answers: [ParticleEnum.DE],
                    english: "To cross a river on a boat",
                },
                {
                    id: "cross-river-with-boat-2",
                    question: "{船}(ふね)で{川}(かわ)_{渡}(わた)る",
                    answers: [ParticleEnum.WO],
                    english: "To cross a river on a boat",
                },
                {
                    id: "he-tired-from-studying-1",
                    question: "{彼}(かれ)_{勉強}(べんきょう)?{疲}(つか)れた",
                    answers: [ParticleEnum.HA, ParticleEnum.GA],
                    english: "He was tired from studying",
                },
                {
                    id: "he-tired-from-studying-2",
                    question: "{彼}(かれ)は{勉強}(べんきょう)_{疲}(つか)れた",
                    answers: [ParticleEnum.NI],
                    english: "He was tired from studying",
                },
                {
                    id: "plane-fly-in-sky-1",
                    question: "{飛行機}(ひこうき)_{空}(そら)?{飛}(と)ぶ",
                    answers: [ParticleEnum.GA],
                    english: "For a plane to fly in the sky",
                },
                {
                    id: "plane-fly-in-sky-2",
                    question: "{飛行機}(ひこうき)が{空}(そら)_{飛}(と)ぶ",
                    answers: [ParticleEnum.WO],
                    english: "For a plane to fly in the sky",
                },
            ],
        },
    ],
};

const saiyanStage: Stage = {
    id: "saiyan-saga",
    name: "Saiyan Saga",
    difficulty: "~N3",
    levels: [
        {
            id: "raditz",
            name: "Raditz",
            questions: [
                {
                    id: "build-a-house",
                    question: "{家}(いえ)_{建}(た)てる",
                    answers: [ParticleEnum.WO],
                    english: "To build a house",
                },
                {
                    id: "look-forward-meet-him-1",
                    question:
                        "{彼}(かれ)と{会}(あ)うの_{楽}(たの)しみ?{待}(ま)つ",
                    answers: [ParticleEnum.WO],
                    english: "To look forward to meeting him",
                },
                {
                    id: "look-forward-meet-him-2",
                    question:
                        "{彼}(かれ)と{会}(あ)うのを{楽}(たの)しみ_{待}(ま)つ",
                    answers: [ParticleEnum.NI],
                    english: "To look forward to meeting him",
                },
                {
                    id: "lead-an-easy-life",
                    question: "{楽}(らく)な{生活}(せいかつ)_{送}(おく)る",
                    answers: [ParticleEnum.WO],
                    english: "To lead an easy life",
                },
                {
                    id: "weather-report-bad",
                    question: "{天気予報}(てんきよほう)_{悪}(わる)い",
                    answers: [ParticleEnum.GA],
                    english: "For the weather report to be bad",
                },
                {
                    id: "raise-a-child",
                    question: "{子供}(こども)_{育}(そだ)てる",
                    answers: [ParticleEnum.WO],
                    english: "To raise a child",
                },
            ],
        },
        {
            id: "saibaman",
            name: "Saibaman",
            questions: [
                {
                    id: "say-you-hate-him-1",
                    question: "「{彼}(かれ)_{嫌}(きら)い」?{言}(い)う",
                    answers: [ParticleEnum.GA],
                    english: "To say (you) hate him",
                },
                {
                    id: "say-you-hate-him-2",
                    question: "「{彼}(かれ)が{嫌}(きら)い」_{言}(い)う",
                    answers: [ParticleEnum.TO],
                    english: "To say (you) hate him",
                },
                {
                    id: "explanation-to-be-helpful-1",
                    question: "{説明}(せつめい)_{役}(やく)?{立}(た)つ",
                    answers: [ParticleEnum.GA],
                    english: "For the explanation to be helpful",
                },
                {
                    id: "explanation-to-be-helpful-2",
                    question: "{説明}(せつめい)が{役}(やく)_{立}(た)つ",
                    answers: [ParticleEnum.NI],
                    english: "For the explanation to be helpful",
                },
                {
                    id: "take-care-of-friends-1",
                    question: "{友達}(ともだち)_{大切}(たいせつ)?する",
                    answers: [ParticleEnum.WO],
                    english: "To take care of (one’s) friends",
                },
                {
                    id: "take-care-of-friends-2",
                    question: "{友達}(ともだち)を{大切}(たいせつ)_する",
                    answers: [ParticleEnum.NI],
                    english: "To take care of (one’s) friends",
                },
                {
                    id: "reassure-ones-parents",
                    question: "{両親}(りょうしん)_{安心}(あんしん)させる",
                    answers: [ParticleEnum.WO],
                    english: "To reassure (one’s) parents",
                },
                {
                    id: "place-milk-in-fridge-1",
                    question:
                        "{冷蔵庫}(れいぞうこ)_{牛乳}(ぎゅうにゅう)?{置}(お)く",
                    answers: [ParticleEnum.NI],
                    english: "To put/place milk in the fridge",
                },
                {
                    id: "place-milk-in-fridge-2",
                    question:
                        "{冷蔵庫}(れいぞうこ)に{牛乳}(ぎゅうにゅう)_{置}(お)く",
                    answers: [ParticleEnum.WO],
                    english: "To put/place milk in the fridge",
                },
            ],
        },
        {
            id: "nappa",
            name: "Nappa",
            questions: [
                {
                    id: "say-stupid-things",
                    question: "バカなこと_{言}(い)う",
                    answers: [ParticleEnum.WO],
                    english: "To say stupid things",
                },
                {
                    id: "change-trains-at-shinjuku-1",
                    question:
                        "{新宿}(しんじゅく)_{電車}(でんしゃ)?{乗}(の)り{換}(か)える",
                    answers: [ParticleEnum.DE],
                    english: "To change trains at Shinjuku",
                },
                {
                    id: "change-trains-at-shinjuku-2",
                    question:
                        "{新宿}(しんじゅく)で{電車}(でんしゃ)_{乗}(の)り{換}(か)える",
                    answers: [ParticleEnum.WO],
                    english: "To change trains at Shinjuku",
                },
                {
                    id: "move-from-apartment-to-mansion-1",
                    question: "アパート_マンション?{引}(ひ)っ{越}(こ)す",
                    answers: [ParticleEnum.KARA],
                    english: "To move from an apartment to a mansion",
                },
                {
                    id: "move-from-apartment-to-mansion-2",
                    question: "アパートからマンション_{引}(ひ)っ{越}(こ)す",
                    answers: [ParticleEnum.NI, ParticleEnum.HE],
                    english: "To move from an apartment to a mansion",
                },
                {
                    id: "humbly-call-me-sean-1",
                    question: "{私}(わたし)_ショーン?{申}(もう)す",
                    answers: [ParticleEnum.GA, ParticleEnum.WO],
                    english: "They (humbly) call me Sean",
                },
                {
                    id: "humbly-call-me-sean-2",
                    question: "{私}(わたし)がショーン_{申}(もう)す",
                    answers: [ParticleEnum.TO],
                    english: "They (humbly) call me Sean",
                },
                {
                    id: "decorate-room-flowers-1",
                    question: "{部屋}(へや)_{花}(はな)?{飾}(かざ)る",
                    answers: [ParticleEnum.WO],
                    english: "To decorate the room with flowers",
                },
                {
                    id: "decorate-room-flowers-2",
                    question: "{部屋}(へや)を{花}(はな)_{飾}(かざ)る",
                    answers: [ParticleEnum.DE],
                    english: "To decorate the room with flowers",
                },
            ],
        },
        {
            id: "vegeta",
            name: "Vegeta",
            questions: [
                {
                    id: "get-in-touch",
                    question: "{連絡}(れんらく)_{取}(と)る",
                    answers: [ParticleEnum.WO],
                    english: "to get in touch (with someone)",
                },
                {
                    id: "add-two-to-three-you-get-five-1",
                    question: "{三}(さん)_{二}(に) ?{足}(た)すと{五}(ご) ?なる",
                    answers: [ParticleEnum.NI],
                    english: "Add two to three, and you get five",
                },
                {
                    id: "add-two-to-three-you-get-five-2",
                    question:
                        "{三}(さん)に{二}(に) _{足}(た)すと{五}(ご) ?なる",
                    answers: [ParticleEnum.WO],
                    english: "Add two to three, and you get five",
                },
                {
                    id: "add-two-to-three-you-get-five-3",
                    question:
                        "{三}(さん)に{二}(に) を{足}(た)すと{五}(ご) _なる",
                    answers: [ParticleEnum.NI],
                    english: "Add two to three, and you get five",
                },
                {
                    id: "touch-a-persons-heart",
                    question: "{心}(こころ)_{打}(う)つ",
                    answers: [ParticleEnum.WO],
                    english:
                        "To touch (a person's) heart, to impress (a person)",
                },
                {
                    id: "exchange-part-with-new-one-1",
                    question:
                        "{部品}(ぶひん)_{新}(あたら)しいの?{取}(と)り{替}(か)える",
                    answers: [ParticleEnum.WO],
                    english: "To exchange the part with a new one",
                },
                {
                    id: "exchange-part-with-new-one-2",
                    question:
                        "{部品}(ぶひん)を{新}(あたら)しいの_{取}(と)り{替}(か)える",
                    answers: [ParticleEnum.TO, ParticleEnum.NI],
                    english: "To exchange the part with a new one",
                },
                {
                    id: "contact-at-convenient-time-1",
                    question:
                        "{都合}(つごう)_いい{時}(とき)?{連絡}(れんらく)する",
                    answers: [ParticleEnum.NO, ParticleEnum.GA],
                    english: "To contact (someone) at a convenient time",
                },
                {
                    id: "contact-at-convenient-time-2",
                    question:
                        "{都合}(つごう)がいい{時}(とき)_{連絡}(れんらく)する",
                    answers: [ParticleEnum.NI],
                    english: "To contact (someone) at a convenient time",
                },
                {
                    id: "wrap-head-with-scarf-1",
                    question: "{頭}(あたま)_スカーフ?{包}(つつ)む",
                    answers: [ParticleEnum.WO],
                    english: "To wrap one’s head in a scarf",
                },
                {
                    id: "wrap-head-with-scarf-2",
                    question: "{頭}(あたま)をスカーフ_{包}(つつ)む",
                    answers: [ParticleEnum.DE],
                    english: "To wrap one’s head in a scarf",
                },
            ],
        },
    ],
};

const drillData: Stage[] = [dragonBallStage, saiyanStage];

export default drillData;
