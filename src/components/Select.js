import React from 'react';

/**
 * Currency select element.
 * 
 * @param {array} props.curs - Array of currency names.
 * @param {string} props.selected - Selected currency name.
 * @param {function} props.curChange - onChange handler.
 */
function Select(props) {
    // let propsCopy = { ...props };
    let curs = props.curs || ["EUR"];
    let selectRef = React.createRef();
    return (
            <select ref={selectRef} className="erc-main-input erc-main-input-select" value={props.selected} onChange={() => props.curChange(selectRef.current.value, props.id)}>
                {
                    curs.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))
                }
            </select>
    );
}

export default Select;