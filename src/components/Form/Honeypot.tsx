import React, { useEffect, MutableRefObject } from "react";

let honeypotTimeout: ReturnType<typeof setTimeout>;

const TIME_UNTIL_DEACTIVATION = 3000; // Time until honeypot deactivates itself (ms)

interface Props {}

import s from "./Form.module.scss";

/**
 * A simple honeypot label + input.
 * After a few seconds the honeypot deactivates the "required" property on the <input>.
 * Input is passed as a ref to the parent form
 * Descriptive label text for screen-readers, but excludes keywords bots might search for
 */
const Honeypot = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    useEffect(() => {
        honeypotTimeout = setTimeout(() => {
            if (ref) {
                 // HACK: the below 'ref.current' type assignments are forced
                (ref as MutableRefObject<HTMLInputElement>).current.required =
                    false;
                (
                    ref as MutableRefObject<HTMLInputElement>
                ).current.ariaRequired = "false";
            }
        }, TIME_UNTIL_DEACTIVATION);

        return () => clearTimeout(honeypotTimeout);
    }, [ref]);

    return (
        <div className={s["c-form__hachimitsu"]}>
            <label htmlFor="address">
                This is not a real form field. Skip to the next field please
            </label>
            <input ref={ref} type="text" id="address" aria-required required />
        </div>
    );
});

Honeypot.displayName = "Honeypot";
export default Honeypot;
