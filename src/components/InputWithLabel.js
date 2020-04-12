import React, { useRef, useEffect } from 'react';

const InputWithLabel = props => {

    const { id, value, onInputChange, type = 'text', children, isFocused } = props;
    const inputRef = useRef();
    
    useEffect(() => {
        if(isFocused && inputRef.current){
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <>
            <label htmlFor={id}>{children}</label>

            <input
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                autoFocus={isFocused}
                onChange={onInputChange}
            />
        </>
    );
};

export default InputWithLabel;