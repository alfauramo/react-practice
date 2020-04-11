import React from 'react';

const Input = props => {

    const {id, label, value, onInputChange, type = 'text'} = props;

    return(
        <>
            <label htmlFor={id}>{label}</label>

            <input
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
            />
        </>
    );
};

export default Input;