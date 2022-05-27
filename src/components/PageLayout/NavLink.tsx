/**
 * Component to enable active classname
 */

import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

interface Props {
    router: any;
    href: string;
    children: React.ReactNode;
    activeClassName: string;
    [attribute: string]: any;
}

const NavLink: React.FC<Props> = (props) => {
    const { router, href, children, activeClassName, ...otherProps } = props;

    let className = otherProps.className;

    if (router.pathname === href && activeClassName) {
        className = `${className} ${activeClassName}`.trim();
    }

    delete otherProps.activeClassName;

    return (
        <Link href={href} {...otherProps}>
            {React.cloneElement(<a title={props.title}>{children}</a>, {
                className,
            })}
        </Link>
    );
};

export default withRouter(NavLink);
