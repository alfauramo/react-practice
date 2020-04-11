import React from 'react';

const InputWithLabel = props => {

    const {id, value, onInputChange, type = 'text', children} = props;

    return(
        <>
            <label htmlFor={id}>{children}</label>

            <input
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
            />
        </>
    );
};

export default InputWithLabel;