import { describe, expect, test } from "vitest";

import { getAllLevels } from "../src/lib/level-api";
import { getAllQuestions } from "../src/lib/question-api";

describe("drillData tests:", () => {
    const allQuestions = getAllQuestions();
    const allLevels = getAllLevels();

    test("Should be no duplicate question IDs in drillData", () => {
        expect(hasDuplicateIds(allQuestions)).toBeFalsy();
    });

    test("Should be no duplicate level IDs in drillData", () => {
        expect(hasDuplicateIds(allLevels)).toBeFalsy();
    });

    test("All questions should have placeholder underscore", () => {
        expect(
            allQuestions.every((q) => q.question.includes("_"))
        ).toBeTruthy();
    });

    // Helper Functions
    interface ObjectWithId {
        id: string;
    }

    function hasDuplicateIds<T extends ObjectWithId>(arr: T[]): boolean {
        const idsArray = arr.map((item) => item.id);
        return idsArray.some((id) => {
            return idsArray.indexOf(id) !== idsArray.lastIndexOf(id);
        });
    }
});
