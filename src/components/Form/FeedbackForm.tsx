import { useRef, useState } from "react";

// Models
import Button, { ButtonColorNames } from "../UI/Button";

// Lib
import useInput from "../../hooks/useInput";
import {
    validateEmail,
    validateTextLength,
} from "../../lib/form/input-validation";

// Components
import TextInput from "./TextInput";
import Honeypot from "./Honeypot";

interface Props {}

import s from "./Form.module.scss";
import { IconName } from "../UI/Icon/Icon";

enum FormStateNameEnum {
    WAITING = "WAITING",
    SENDING = "SENDING",
    SENT = "SENT",
    ERROR = "ERROR",
}

/**
 * Enum for feedback messages.
 * Keys serve as IDs and are uses as BEM modifier names
 */
const FORM_STATES: {
    [key in FormStateNameEnum]: {
        bttn: string;
        alert: string | false;
        color: ButtonColorNames;
        icon: IconName;
    };
} = {
    WAITING: {
        bttn: "Send",
        alert: false,
        color: "blue",
        icon: "arrow-right",
    },
    SENDING: {
        bttn: "Sending",
        alert: "Sending enquiry, this may take a few seconds...",
        color: "orange",
        icon: "hourglass",
    },
    SENT: {
        bttn: "Sent",
        alert: "Enquiry sent! Please check your emails for an email of receipt",
        color: "green",
        icon: "check",
    },
    ERROR: {
        bttn: "Error",
        alert: "An error occured. Please try again in a few minutes",
        color: "red",
        icon: "cross",
    },
};

const subjectMinLength = 3;
const messageMinLength = 9;

const FeedbackForm: React.FC<Props> = (props) => {
    const honeypotRef = useRef<HTMLInputElement>(null);
    const [formState, setFormState] = useState(FormStateNameEnum.WAITING);

    const subject = useInput(
        validateTextLength.bind(null, false, subjectMinLength)
    );
    const message = useInput(
        validateTextLength.bind(null, true, messageMinLength)
    );
    const email = useInput(validateEmail.bind(null, false));

    let formIsValid = false;
    if (subject.isValid && email.isValid && message.isValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!formIsValid) return;

        // Honeypot check – form invalid if has value
        if (honeypotRef && honeypotRef.current?.value.trim() !== "") return;

        setFormState(FormStateNameEnum.SENDING);

        const response = await fetch("/api/submit-feedback", {
            method: "POST",
            body: JSON.stringify({
                subject: subject.value,
                email: email.value,
                message: message.value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    setFormState(FormStateNameEnum.SENT);
                    return res.json();
                } else {
                    throw new Error(`${res.status}: ${res.statusText}`);
                }
            })
            .catch((error) => {
                setFormState(FormStateNameEnum.ERROR);
                return { message: `${error.name}: ${error.message}` }; // Spoof response
            });

        console.log(response.message);

        subject.reset();
        email.reset();
        message.reset();
    };

    return (
        <form className={s["c-form"]} onSubmit={formSubmissionHandler}>
            <Honeypot ref={honeypotRef} />
            <TextInput
                id="subject"
                labelText="Subject"
                errorText={`Subject must be longer than ${subjectMinLength} characters`}
                maxLength="64"
                {...subject}
            />
            <TextInput
                id="email"
                labelText="Email"
                errorText="Please enter a valid email address"
                maxLength="320"
                {...email}
            />
            <TextInput
                isTextarea={true}
                id="message"
                labelText="Message"
                errorText={`Messages must not be longer than ${messageMinLength} characters`}
                rows="5"
                required={true}
                placeholder="Enter any feedback or opinions you have on the app here. Any input is much appreciated!"
                {...message}
            />
            <div className={s["c-form__actions"]}>
                <Button
                    type="submit"
                    disabled={
                        !formIsValid || formState === FormStateNameEnum.SENT
                    }
                    color={FORM_STATES[formState].color}
                    icon={FORM_STATES[formState].icon}
                >
                    {FORM_STATES[formState].bttn}
                </Button>
            </div>
            {formState !== FormStateNameEnum.WAITING && (
                <div
                    className={`${s["c-form__status"]} ${
                        s[`c-form__status--${formState.toLowerCase()}`]
                    }`}
                >
                    {FORM_STATES[formState].alert}
                </div>
            )}
        </form>
    );
};

export default FeedbackForm;
