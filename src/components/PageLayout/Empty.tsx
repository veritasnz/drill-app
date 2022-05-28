import Prose from "../Blocks/Prose";
import LinkButton from "../UI/LinkButton";

import s from "./Layout.module.scss";

interface Props {
    buttonUrl?: string;
    buttonText?: JSX.Element | string;
    children: React.ReactNode;
}

const Empty: React.FC<Props> = (props) => {
    return (
        <div className={s["empty"]}>
            <Prose>{props.children}</Prose>

            {props.buttonUrl && props.buttonText && (
                <div className={s["empty__bttn"]}>
                    <LinkButton
                        color="blue"
                        href={props.buttonUrl}
                        isExternal={
                            props.buttonUrl
                                ? props.buttonUrl.includes("http")
                                : false
                        }
                    >
                        {props.buttonText}
                    </LinkButton>
                </div>
            )}
        </div>
    );
};

export default Empty;
