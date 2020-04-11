import React from 'react';
import InputWithLabel from './InputWithLabel';

const Search = ({ search, onSearch }) => {

    return (
        <InputWithLabel
            id="search"
            label="Search"
            value={search}
            onInputChange={onSearch}
        >
            <strong>Search: </strong>
        </InputWithLabel>
    );
}

export default Search;