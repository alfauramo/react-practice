import React from 'react';
import InputWithLabel from './InputWithLabel';

const Search = ({ searchTerm, onSearchInput, onSearchSubmit }) => {

    return (
        <>
            <InputWithLabel
                id="search"
                label="Search"
                value={searchTerm}
                isFocused
                onInputChange={onSearchInput}
            >
                <strong>Search: </strong>
            </InputWithLabel>
            <button
                type="button"
                disabled={!searchTerm}
                onClick={onSearchSubmit}
            >
                Submit
            </button>
        </>
    );
}

export default Search;