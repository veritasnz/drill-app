import { IconName } from "../UI/Icon/Icon";

import Icon from "../UI/Icon/Icon";

import s from "./Blocks.module.scss";

enum HeadingLevel {
    H1 = 1,
    H2 = 2,
    H3 = 3,
    H4 = 3,
    H5 = 3,
    H6 = 3,
}

interface Props {
    icon?: IconName;
    heading: HeadingLevel;
    children: React.ReactNode;
}

const Section: React.FC<Props> = (props) => {
    const Heading = `h${props.heading}` as keyof JSX.IntrinsicElements;

    return (
        <Heading className={s["title"]}>
            <span className={s["title__icon"]}>
                {props.icon && <Icon name={props.icon} />}
            </span>
            <span className={s["title__text"]}>{props.children}</span>
        </Heading>
    );
};

export default Section;
