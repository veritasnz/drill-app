/**
 * Validates the email field
 * @param required whether the field is required or not
 * @param value value of the email text inputted
 * @returns the validity of the field as a boolean
 */
export function validateEmail(required: boolean, value: string) {
    if (!required && value === "") return true;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
        return true;
    return false;
}

/**
 * Validates text from text input element or textarea element
 * @param required whether the field is required or not
 * @param minLength minimum length of the text
 * @param value value of the text inputted
 * @returns the validity of the field as a boolean
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
