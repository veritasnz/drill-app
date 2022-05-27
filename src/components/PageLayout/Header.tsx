import NavLink from "./NavLink";
import Icon, { IconName } from "../UI/Icon/Icon";

import s from "./Layout.module.scss";

import Link from "next/link";

interface MenuItem {
    href: string;
    icon: IconName;
    title: string;
}

const Header: React.FC = () => {
    const menuItems: MenuItem[] = [
        { href: "/", icon: "home-circle", title: "Home" },
        { href: "/about", icon: "about-circle", title: "About" },
        { href: "/stats", icon: "stats-circle", title: "Stats" },
        { href: "/levels", icon: "level-circle", title: "Levels" },
        { href: "/settings", icon: "settings-circle", title: "Settings" },
    ];

    return (
        <header className={s["header"]}>
            <div className={s["header__wrap"]}>
                <h1 className={s["header__logo"]}>
                    <Link href="/">
                        <a title="Go to the Home page">
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
                    {menuItems.map((item) => (
                        <HeaderNavItem
                            key={item.href}
                            href={item.href}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}
                </nav>
            </div>
        </header>
    );
};

const HeaderNavItem: React.FC<MenuItem> = (props) => {
    return (
        <NavLink
            title={`Go to the ${props.title} page`}
            href={props.href}
            className={s["nav-item"]}
            activeClassName="active"
        >
            <i className={s["nav-item__ico"]}>
                <Icon name={props.icon} />
            </i>
            <span className={s["nav-item__text"]}>{props.title}</span>
        </NavLink>
    );
};

export default Header;
