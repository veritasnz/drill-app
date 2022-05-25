import Router from "next/router";

import Button from "../UI/Button";
import s from "./Drill.module.scss";

interface Props {
    isPostAnswer?: boolean;
    content?: string[];
}

const DrillEmpty: React.FC<Props> = (props) => {
    return (
        <div className={s["empty"]}>
            <p>
                All the available levels after this one have already been
                finished!
            </p>
            <p>Go to the Levels page and choose another one.</p>
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
