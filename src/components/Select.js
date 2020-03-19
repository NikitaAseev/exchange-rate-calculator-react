import React from 'react';

/**
 * Currency select element.
 * 
 * @param {array} props.curs - Array of currency names.
 * @param {string} props.selected - Selected currency name.
 * @param {function} props.curChange - onChange handler.
 */
function Select(props) {
    let propsCopy = { ...props };
    if (!propsCopy.curs) propsCopy.curs = ["GBP"];

    return (
        <select className="erc-main-input erc-main-input-select" value={props.selected} onChange={props.curChange}>
            {
                propsCopy.curs.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))
            }
        </select>
    );
}

export default Select;