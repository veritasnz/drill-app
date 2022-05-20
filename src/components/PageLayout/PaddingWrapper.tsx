import Header from "./Header";

import s from "./Layout.module.scss";

interface Props {
    children: React.ReactNode;
}

const PaddingWrapper: React.FC<Props> = (props) => {
    return (
        <div className={s["padding-wrapper"]}>
            <div className={s["padding-wrapper__wrap"]}>{props.children}</div>
        </div>
    );
};

export default PaddingWrapper;
