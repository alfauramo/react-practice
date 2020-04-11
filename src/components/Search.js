import React from 'react';
import Input from './Input';

const Search = ({ search, onSearch }) => {

    return (
        <Input
            id="search"
            label="Search"
            value={search}
            onInputChange={onSearch}
        />
    );
}

export default Search;