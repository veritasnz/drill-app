import Header from "./Header";

import s from "./Layout.module.scss";

interface Props {
    children: React.ReactNode;
}

const PageWrapper: React.FC<Props> = (props) => {
    return (
        <>
            <Header />
            <main className={s["page-wrapper"]}>
                <div className={s["page-wrapper__wrap"]}>{props.children}</div>
            </main>
        </>
    );
};

export default PageWrapper;
