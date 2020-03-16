import React from 'react';

function Select(props) {
    let propsCopy = { ...props };
    if (!propsCopy.curs) propsCopy.curs = ["GBP"];

    return (
        <select className="erc-main-input" value={props.selected} onChange={props.curChange}>
            {
                propsCopy.curs.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))
            }
        </select>
    );
}

export default Select;