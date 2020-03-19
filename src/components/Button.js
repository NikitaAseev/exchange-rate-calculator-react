import React from 'react';

/**
 * Generic button element.
 * 
 * @param {string} props.text - Button's text
 * @param {function} props.handleSwapClick - onClick handler
 */
function Button(props) {
    return (
        <button className="erc-button" onClick={props.handleSwapClick}>{props.text}</button>
    )
}

export default Button;