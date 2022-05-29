interface Props {
    id: string;
    labelText: string;
    errorText: string;
    value: string;
    hasError: boolean;
    inputChangeHandler: (e: any) => void;
    inputBlurHandler: (e: any) => void;
    required?: boolean;
    isTextarea?: true | null;
    [key: string]: any;
}

import s from "./Form.module.scss";

const TextInput: React.FC<Props> = (props) => {
    const {
        isTextarea,
        id,
        labelText,
        errorText,
        value,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        required,
        isValid,
        reset,
        ...leftoverProps
    } = props;

    return (
        <div
            className={`${s["c-form__control"]} ${
                hasError && s["c-form__control--invalid"]
            }`}
        >
            <div className={s["c-form__control-wrap"]}>
                <label htmlFor={id} className={s["c-form__label"]}>
                    <em>{labelText}</em>
                    {!required && <small>(Optional)</small>}
                </label>
                {isTextarea ? (
                    <textarea
                        className={s["c-form__field"]}
                        id={id}
                        value={value}
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler}
                        aria-invalid={hasError}
                        aria-required={required}
                        required={required}
                        {...leftoverProps}
                    />
                ) : (
                    <input
                        className={s["c-form__field"]}
                        type="text"
                        id={id}
                        value={value}
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler}
                        aria-invalid={hasError}
                        aria-required={required}
                        required={required}
                        {...leftoverProps}
                    />
                )}
            </div>

            {hasError && <p className={s["c-form__error"]}>{errorText}</p>}
        </div>
    );
};

export default TextInput;
