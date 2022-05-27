import Router from "next/router";

import Button from "../UI/Button";
import s from "./Drill.module.scss";

interface Props {
    isGraveyard: boolean;
}

const DrillEmpty: React.FC<Props> = (props) => {
    let content: JSX.Element | string;
    let buttonText: JSX.Element | string;

    if (props.isGraveyard) {
        content = <>No questions left in the Graveyard! Well done.</>;
        buttonText = "Choose another level";
    } else {
        content = (
            <>
                All the available levels after this one have already been
                finished!
                <br />
                Go to the Levels page and choose another one.
            </>
        );
        buttonText = "Go to the Levels page";
    }

    return (
        <div className={s["empty"]}>
            <p>{content}</p>
            <div className={s["empty__bttn"]}>
                <Button
                    color="blue"
                    icon="chevron-right"
                    onClick={() => Router.push("/levels")}
                >
                    Go to the Levels Page
                </Button>
            </div>
        </div>
    );
};

export default DrillEmpty;
