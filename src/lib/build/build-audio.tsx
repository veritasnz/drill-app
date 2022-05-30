import fs from "fs";
import util from "util";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

import Question from "../../models/Question.model";

import { parseQuestionTextForTTS } from "../question-parser";

/**
 * Build MP3 audio from Google Cloud Text-to-speech API
 */
const client = new TextToSpeechClient({
    credentials: {
        client_email: process.env.GOOGLE_CREDENTIALS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CREDENTIALS_PRIVATE_KEY,
    },
});

/**
 * Loops through all questions and turns their text into MP3 files inside of '/public/audio/'
 */
export default async function buildVoices(allQuestions: Question[]) {
    // Delete dir if exists
    if (fs.existsSync("public/audio")) {
        console.log("Directory 'public/audio' already exists. Deleting...");
        fs.rmSync("public/audio", { recursive: true, force: true });
    }

    // Re-make dir
    fs.mkdirSync("public/audio");

    let charsToConvert = 0;

    for (const question of allQuestions) {
        const currentText = parseQuestionTextForTTS(
            question.question,
            question.answers[0]
        );

        charsToConvert += currentText.length;

        if (currentText) await writeMp3FromText(currentText, question.id);
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

        await writeFile(
            `public/audio/${filename}.mp3`,
            response.audioContent as any, // hack
            "binary"
        );

        console.log(`Audio content written to file: ${filename}.mp3`);
    }
};
