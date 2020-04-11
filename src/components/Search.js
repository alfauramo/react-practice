import React from 'react';

const Search = ({ onSearch, searchTerm }) => {

    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={onSearch}
            />
        </div>
    );
}

export default Search;