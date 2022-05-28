import Link from "next/link";
import React from "react";

import { ButtonColorNames } from "./Button";
import Icon, { IconName } from "./Icon/Icon";

import s from "./UI.module.scss";

interface Props {
    color: ButtonColorNames;
    href: string;
    isExternal: boolean;
}

const LinkButton: React.FC<Props> = (props) => {
    // Destruct
    const { color, href, isExternal, children, ...otherProps } = props;

    if (isExternal) {
        return (
            <a
                href={href}
                className={`${s["button"]} ${s[`button--${color}`]}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className={s["button__text"]}>{children}</span>
                <span className={s["button__icon"]}>
                    <Icon name="external-link" />
                </span>
            </a>
        );
    }

    return (
        <Link href={href} {...otherProps}>
            <a className={`${s["button"]} ${s[`button--${color}`]}`}>
                <span className={s["button__text"]}>{children}</span>
                <span className={s["button__icon"]}>
                    <Icon name="arrow-right" />
                </span>
            </a>
        </Link>
    );
};

export default LinkButton;
