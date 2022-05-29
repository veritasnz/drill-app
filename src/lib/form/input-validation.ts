/**
 * Validates the email field
 * @param {string} value
 * @returns {boolean}
 */
export function validateEmail(required: boolean, value: string) {
    if (!required && value === "") return true;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
        return true;
    return false;
}

/**
 * Validates text
 * @param {string} value
 * @returns {boolean}
 */
export const validateTextLength = (
    required: boolean,
    minLength: number,
    value: string
) => {
    if (!required && value === "") return true;
    if (value.trim().length > minLength) return true;
    return false;
};
