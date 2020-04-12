import React, { useState, useEffect, useReducer, useCallback } from 'react';
import List from './components/List';
import Search from './components/Search';
import API_ENDPOINT from './constants'
import Reducer from './components/Reducer';

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

  const handleFetchStories = useCallback(() => {
      dispatchStories({ type: 'STORIES_FETCH_INIT' });

      fetch(url)
        .then(response => response.json())
        .then(result => {
          dispatchStories({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.hits,
          });
        })
        .catch(() => 
          dispatchStories({ type: 'STORIES_fETCH_FAILURE' })
        );
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
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        search={searchTerm}
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
