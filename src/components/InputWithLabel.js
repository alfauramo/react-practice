import React, { useRef, useEffect } from 'react';

import styles from '../App.module.css';

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
            <label htmlFor={id} className={styles.label}>
                {children}
            </label>
            &nbsp;
            <input
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                autoFocus={isFocused}
                onChange={onInputChange}
                className={styles.input}
            />
        </>
    );
};

export default InputWithLabel;