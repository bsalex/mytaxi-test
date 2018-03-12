import React from 'react';
import classnames from 'classnames';

export default function (props: {className?: string}) {
    return (<div className={classnames(props.className, 'vehicles-list')}>List here</div>);
}