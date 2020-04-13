import React, { useState, useEffect, useReducer, useCallback } from 'react';
import List from './components/List';
import SearchForm from './components/SearchForm';
import API_ENDPOINT from './constants'
import Reducer from './components/Reducer';
import axios from 'axios';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

const App = props => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const[url, setUrl] = useState(
    `${API_ENDPOINT}${searchTerm}`
  )

  const [stories, dispatchStories] = useReducer(
    Reducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = useCallback(async() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try{
      const result = await axios.get(url);
      
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE '});
    }      
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  }
  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    })
  }

  const handleSearchSubmit = event => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm}
      />

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
          <List
            stories={stories.data}
            onRemoveItem={handleRemoveStory}
          />
        )
      }
    </div>
  );
}

export default App;
