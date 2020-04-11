import React from 'react';

const Search = props => {

    const {onSearch} = props;

    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input
                id="search"
                type="text"
                onChange={onSearch}
            />
        </div>
    );
}

export default Search;