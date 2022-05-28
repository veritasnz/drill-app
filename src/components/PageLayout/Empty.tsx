import Router from "next/router";

import Button from "../UI/Button";

import s from "./Layout.module.scss";

interface Props {
    buttonText?: JSX.Element | string;
    buttonUrl?: string;
    children: React.ReactNode;
}

const Empty: React.FC<Props> = (props) => {
    return (
        <div className={s["empty"]}>
            <p>{props.children}</p>

            {props.buttonUrl && props.buttonText && (
                <div className={s["empty__bttn"]}>
                    <Button
                        color="blue"
                        icon="chevron-right"
                        onClick={() => Router.push(`${props.buttonUrl}`)}
                    >
                        {props.buttonText}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Empty;
