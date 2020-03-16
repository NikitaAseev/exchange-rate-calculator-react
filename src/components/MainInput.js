import React from 'react';

function MainInput(props) {
    return (
        <input className="erc-main-input" type="number" value={props.amount} onChange={props.inputChange}></input>
    )
}

export default MainInput;