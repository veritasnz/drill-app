import { TextToSpeechClient } from "@google-cloud/text-to-speech";

import fs from "fs";
import util from "util";

import { getAllQuestions } from "./question-api";
import { parseQuestionTextForTTS } from "./question-parser";

const env = process.env.NODE_ENV;

/**
 * Build MP3 audio from Google Cloud Text-to-speech API
 */
const client = new TextToSpeechClient();

export async function buildVoices() {
    const allQuestions = getAllQuestions();

    let charsToConvert = 0;

    for (const question of allQuestions) {
        const currentText = parseQuestionTextForTTS(
            question.question,
            question.answers[0]
        );

        charsToConvert += currentText.length;

        if (currentText && env == "production") {
            await writeMp3FromText(currentText, question.id);
        }
    }

    console.log(`Converted ${charsToConvert} chars using TTS API`);
}

const writeMp3FromText: (text: string, filename: string) => void = async (
    text,
    filename
) => {
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech({
        input: { text: text },
        voice: {
            languageCode: "ja-JP",
            name: "ja-JP-Wavenet-D",
        },
        audioConfig: { audioEncoding: "MP3" },
    });

    // if there are files to write
    if (response) {
        // Write the binary audio content to a local file
        const writeFile = util.promisify(fs.writeFile);

        // Check if directory exists, create if non-existant
        if (!fs.existsSync("public/audio")) fs.mkdirSync("public/audio");

        await writeFile(
            `public/audio/${filename}.mp3`,
            response.audioContent as any, // hack
            "binary"
        );

        console.log(`Audio content written to file: ${filename}.mp3`);
    }
};
