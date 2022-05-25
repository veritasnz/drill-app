import drillData from "../data/drillData";

import { Level } from "../models/Level.model";
import { getUnansweredQuestionsInLevel } from "./question-api";

/**
 * Returns a Level given a level ID
 * @param levelId
 * @returns {Level | null}
 */
export const getLevelById: (levelId: string) => Level | null = (
    levelId: string
) => {
    let levelToReturn: Partial<Level> | null = null;

    drillData.every((stage) => {
        const foundLevel = stage.levels.find((level) => level.id === levelId);

        if (foundLevel) {
            levelToReturn = foundLevel;
            return false;
        }

        return true;
    });

    return levelToReturn;
};

/**
 * Gets the next level given the current level's ID
 * @param levelId
 * @returns {Level | null}
 */
export const getNextLevelById: (currLevelId: string) => Level | null = (
    levelId: string
) => {
    let nextLevel: Level | null = null;

    let currStageIndex: number = -1;
    let currLevelIndex: number = -1;

    // Get indexes for current level
    drillData.every((stage, index) => {
        let levelIndex: number;
        const foundLevel = stage.levels.find((level, index) => {
            levelIndex = index;
            return level.id === levelId;
        });

        if (foundLevel) {
            currStageIndex = index;
            currLevelIndex = levelIndex!;
            return false;
        }

        return true;
    });

    // Get next level
    if (currStageIndex !== -1 && currLevelIndex !== -1) {
        while (!nextLevel) {
            if (drillData[currStageIndex].levels.length > currLevelIndex + 1) {
                // If next level exists
                nextLevel =
                    drillData[currStageIndex].levels[currLevelIndex + 1];
            } else if (drillData.length > currStageIndex + 1) {
                // Else if next stage exists
                nextLevel = drillData[currStageIndex + 1].levels[0];
            } else {
                break;
            }
        }
    }

    return nextLevel;
};

/**
 * Get's a level's index as a number if all stages were flattened and concatenated
 * @param levelId
 * @returns {number}
 */
export const getLevelNum: (levelId: string) => number = (levelId: string) => {
    let returnIndex: number = -1;

    drillData.every((stage) => {
        const levelFound = stage.levels.find((level) => {
            returnIndex++;
            return level.id === levelId;
        });

        if (levelFound) {
            return false;
        }

        return true;
    });

    return returnIndex + 1;
};

/**
 * Loop over drillData and return flattened levels
 * @returns
 */
export const getAllLevels: () => Level[] = () => {
    const levelsArray: Level[] = [];

    drillData.forEach((stage) => {
        stage.levels.forEach((level) => levelsArray.push(level));
    });

    return levelsArray;
};

/**
 * Returns total number of levels in drillData
 * @returns {number} total number of levels in drillData
 */
export const getTotalLevelCount: () => number = () => {
    let levelCount = 0;

    drillData.forEach((stage) => {
        levelCount += stage.levels.length;
    });

    return levelCount;
};

interface HighestCompletedLevel {
    name: string;
    level: number;
}

/**
 * Returns an object with the name and level num of the highest completed level
 * given some answeredIds
 * @param answeredIds
 * @returns {HighestCompletedLevel}
 */
export const getHighestCompletedLevel = (answeredIds: string[]) => {
    const allLevels = getAllLevels();

    let highestLevel: Partial<HighestCompletedLevel> = {};

    allLevels.every((level, index) => {
        const unansweredQuestions = getUnansweredQuestionsInLevel(
            answeredIds,
            level.questions
        );

        if (unansweredQuestions.length > 0) return false;

        highestLevel = {
            name: level.name,
            level: index + 1,
        };
        return true;
    });

    return highestLevel as HighestCompletedLevel;
};
