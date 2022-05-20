import Header from "./Header";

import s from "./Layout.module.scss";

interface Props {
    children: React.ReactNode;
}

const LayoutWrapper: React.FC<Props> = (props) => {
    return (
        <>
            <Header />
            <main>{props.children}</main>
        </>
    );
};

export default LayoutWrapper;
