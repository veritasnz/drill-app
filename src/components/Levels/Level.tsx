import { useContext, useEffect, useState } from "react";
import Router from "next/router";

import { Level as LevelModel } from "../../models/Level.model";
import { getAnsweredQuestionsInLevel } from "../../lib/question-api";
import ProgressContext from "../../context/progress-context";

import s from "./Levels.module.scss";

import Button from "../UI/Button";
import ButtonWrap from "../UI/ButtonWrap";
import ProgressCircle from "./ProgressCircle";
import TransitionButton from "../UI/TransitionButton";
import Icon from "../UI/Icon/Icon";

interface Props {
    level: LevelModel;
}

const Level: React.FC<Props> = ({ level }) => {
    const ctx = useContext(ProgressContext);

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [percentageComplete, setPercentageComplete] = useState(0);

    // Setup vars
    const isActiveLevel = level.id === ctx.state.currentLevelId;
    const levelNum = ctx.state.currentLevelNum;

    const answeredQsIds = getAnsweredQuestionsInLevel(
        ctx.state.answeredQuestionIds,
        level.questions
    ).map((question) => question.id);

    // Calculate level progress based on unanswered questions
    useEffect(() => {
        const roughDecimal = answeredQsIds.length / level.questions.length;
        setPercentageComplete(Math.round(roughDecimal * 100));
    }, [ctx.state.answeredQuestionIds, answeredQsIds, level]);

    // Button Handlers
    const changeLevelHandler = () => {
        ctx.setLevelId(level.id);
        Router.push("/");
    };

    const resetLevelHandler = () => {
        ctx.removeAnsweredQuestionsIds(answeredQsIds);
    };

    const toggleDrawerHandler = () => {
        setDrawerIsOpen((prevState) => !prevState);
    };

    // Classnames
    const levelClassnames = `${s["level"]} ${
        isActiveLevel && s["level--active"]
    } ${drawerIsOpen && s["level--open"]}`;

    return (
        <li className={levelClassnames}>
            <header className={s["level-head"]}>
                <button
                    className={s["level-head__wrapper"]}
                    onClick={toggleDrawerHandler}
                >
                    <div className={s["level-head__inner-child"]}>
                        <ProgressCircle
                            percentage={percentageComplete}
                            levelNum={levelNum}
                        />
                        <h3 className={s["level-head__name"]}>
                            <span>{level.name}</span>
                            {isActiveLevel && <small>・Active</small>}
                        </h3>
                    </div>
                    <div className={s["level-head__inner-child"]}>
                        <p className={s["level-head__prog"]}>
                            <span>{answeredQsIds.length}</span>
                            {" / "}
                            <strong>{level.questions.length}</strong>
                        </p>
                        <div className={s["level-head__chev"]}>
                            <Icon name="chevron-down" />
                        </div>
                    </div>
                </button>
            </header>

            <div className={s["level-body"]}>
                <div className={s["level-body__wrap"]}>
                    <ButtonWrap>
                        <Button
                            onClick={changeLevelHandler}
                            color="blue"
                            icon="arrow-right"
                        >
                            Go
                        </Button>
                        <TransitionButton
                            preText="Reset"
                            color="orange"
                            icon="refresh"
                            onClick={resetLevelHandler}
                        />
                    </ButtonWrap>
                </div>
            </div>
        </li>
    );
};

export default Level;
