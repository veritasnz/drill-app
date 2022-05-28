import { describe, expect, test } from "vitest";

import { getAllLevels } from "../src/lib/level-api";
import { getAllQuestions } from "../src/lib/question-api";

describe("drillData tests:", () => {
    test("Should be no duplicate question IDs in drillData", () => {
        expect(hasDuplicateIds(getAllQuestions())).toBeFalsy();
    });

    test("Should be no duplicate level IDs in drillData", () => {
        expect(hasDuplicateIds(getAllLevels())).toBeFalsy();
    });
});

interface ObjectWithId {
    id: string;
}

function hasDuplicateIds<T extends ObjectWithId>(arr: T[]): boolean {
    const idsArray = arr.map((item) => item.id);
    return idsArray.some((id) => {
        return idsArray.indexOf(id) !== idsArray.lastIndexOf(id);
    });
}
