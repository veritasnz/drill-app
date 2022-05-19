import NavLink from "./NavLink";
import Icon from "../UI/Icon/Icon";

import s from "./Layout.module.scss";

import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className={s["header"]}>
            <div className={s["header__wrap"]}>
                <h1 className={s["header__logo"]}>
                    <Link href="/">
                        <a className={s["header__nav-item"]}>LOGO</a>
                    </Link>
                </h1>

                <nav className={s["header__nav"]}>
                    <NavLink
                        href="/"
                        className={s["header__nav-item"]}
                        activeClassName="active"
                    >
                        <i>
                            <Icon name="home-circle" />
                        </i>
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        href="/about"
                        className={s["header__nav-item"]}
                        activeClassName="active"
                    >
                        <i>
                            <Icon name="about-circle" />
                        </i>
                        <span>About</span>
                    </NavLink>
                    <NavLink
                        href="/stats"
                        className={s["header__nav-item"]}
                        activeClassName="active"
                    >
                        <i>
                            <Icon name="stats-circle" />
                        </i>
                        <span>Stats</span>
                    </NavLink>
                    <NavLink
                        href="/level"
                        className={s["header__nav-item"]}
                        activeClassName="active"
                    >
                        <i>
                            <Icon name="level-circle" />
                        </i>
                        <span>Level</span>
                    </NavLink>
                    <NavLink
                        href="/settings"
                        className={s["header__nav-item"]}
                        activeClassName="active"
                    >
                        <i>
                            <Icon name="settings-circle" />
                        </i>
                        <span>Settings</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
