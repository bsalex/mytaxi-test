import React from 'react';
import classnames from 'classnames';
import './AppHeader.pcss';
const logo = require('./logo.svg');

export default function(props: {className?: string}) {
    return (
        <div className={classnames(props.className, 'app-header')}>
            <a className="app-header__logo" href="/">
                <img alt="mytaxi" src={logo} />
            </a>
        </div>
    );
}
