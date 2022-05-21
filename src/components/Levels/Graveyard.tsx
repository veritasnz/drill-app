import { useContext } from "react";
import Router from "next/router";

import ProgressContext from "../../context/progress-context";

import s from "./Levels.module.scss";

import Icon from "../UI/Icon/Icon";

interface Props {}

const Graveyard: React.FC<Props> = (props) => {
    const progressCtx = useContext(ProgressContext);

    // Button Handlers
    const changeLevelHandler = () => {
        progressCtx.setLevelId("GRAVEYARD");
        Router.push("/");
    };

    return (
        <section className={`${s["stage-wrap"]} ${s["stage-wrap--graveyard"]}`}>
            <div className={`${s["graveyard"]} ${s["stage-wrap__inner"]}`}>
                <div className={s["graveyard__cont"]}>
                    <h2 className={s["graveyard__tit"]}>
                        <i>
                            <Icon name="graveyard" />
                        </i>
                        <span>Graveyard</span>
                    </h2>
                    <p className={s["graveyard__desc"]}>
                        Practice missed questions here
                    </p>
                </div>
                <button
                    className={s["graveyard__icon"]}
                    onClick={changeLevelHandler}
                >
                    <Icon name="arrow-right-circle" />
                </button>
            </div>
        </section>
    );
};

export default Graveyard;
