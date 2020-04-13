import React from 'react';
import InputWithLabel from './InputWithLabel';

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => {

    return (
        <>
            <form onSubmit={onSearchSubmit} className="search-form">
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
                    type="submit"
                    disabled={!searchTerm}
                    className="button button_large"
                >
                    Submit
                </button>
            </form>
        </>
    );
}

export default SearchForm;