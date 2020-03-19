import React from 'react';

/**
 * Currency input element.
 * 
 * @param {number} props.amount - New input's initial value.
 * @param {function} props.inputChange - New input's onChange handler.
 */
function Input(props) {
    return (
        <input className="erc-main-input erc-main-input-text" type="number" value={props.amount} onChange={props.inputChange}></input>
    )
}

export default Input;