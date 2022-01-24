import drillData from "../../data/drillData";
import Level from "../models/Level.model";

/**
 * getLevelById
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
 * getLevelNumber
 */
export const getLevelNumber: (levelId: string) => number = (
    levelId: string
) => {
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

    return returnIndex;
};

/**
 * getLevelWithNumber
 */
// export const getLevelWithNumber: (levelId: string) => {
//     level: Level;
//     number: number;
// } = (levelId: string) => {
//     let returnIndex: number = -1;
//     let returnLevel: Level;

//     drillData.every((stage) => {
//         const levelFound = stage.levels.find((level) => {
//             returnIndex++;
//             return level.id === levelId;
//         });

//         if (levelFound) {
//             returnLevel = levelFound;
//             return false;
//         }

//         return true;
//     });

//     return {
//         level: returnLevel!,
//         number: returnIndex,
//     };
// };

/**
 * getNextLevelById
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

// export const getLevelByIndex: (
//     stageIndex: number,
//     levelIndex: number
// ) => Level = (stageIndex: number, levelIndex: number) => {
//     return drillData[stageIndex].levels[levelIndex];
// };
