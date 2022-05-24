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
                        <a>
                            <img
                                src="/img/logo.svg"
                                alt="Wonideto | Japanese particle learning app"
                            />
                            <img
                                src="/img/logo-horizontal.svg"
                                alt=""
                                aria-hidden="true"
                            />
                        </a>
                    </Link>
                </h1>

                <nav className={s["header__nav"]}>
                    <NavLink
                        href="/"
                        className={s["nav-item"]}
                        activeClassName="active"
                    >
                        <div className={s["nav-item__wrap"]}>
                            <i className={s["nav-item__ico"]}>
                                <Icon name="home-circle" />
                            </i>
                            <span className={s["nav-item__text"]}>Home</span>
                        </div>
                    </NavLink>
                    <NavLink
                        href="/about"
                        className={s["nav-item"]}
                        activeClassName="active"
                    >
                        <div className={s["nav-item__wrap"]}>
                            <i className={s["nav-item__ico"]}>
                                <Icon name="about-circle" />
                            </i>
                            <span className={s["nav-item__text"]}>About</span>
                        </div>
                    </NavLink>
                    <NavLink
                        href="/stats"
                        className={s["nav-item"]}
                        activeClassName="active"
                    >
                        <div className={s["nav-item__wrap"]}>
                            <i className={s["nav-item__ico"]}>
                                <Icon name="stats-circle" />
                            </i>
                            <span className={s["nav-item__text"]}>Stats</span>
                        </div>
                    </NavLink>
                    <NavLink
                        href="/levels"
                        className={s["nav-item"]}
                        activeClassName="active"
                    >
                        <div className={s["nav-item__wrap"]}>
                            <i className={s["nav-item__ico"]}>
                                <Icon name="level-circle" />
                            </i>
                            <span className={s["nav-item__text"]}>Levels</span>
                        </div>
                    </NavLink>
                    <NavLink
                        href="/settings"
                        className={s["nav-item"]}
                        activeClassName="active"
                    >
                        <div className={s["nav-item__wrap"]}>
                            <i className={s["nav-item__ico"]}>
                                <Icon name="settings-circle" />
                            </i>
                            <span className={s["nav-item__text"]}>
                                Settings
                            </span>
                        </div>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
