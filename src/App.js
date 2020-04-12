import React, { useState, useEffect, useReducer } from 'react';
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


  console.log(API_ENDPOINT);

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [stories, dispatchStories] = useReducer(
    Reducer,
    { data: [], isLoading: false, isError: false }
  );

  useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetch(`${API_ENDPOINT}react`)
      .then(response => response.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        })
      })
      .catch(() => {
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      })
  }, []);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    })
  }

  const searchedStories = stories.data.filter(
    story => story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search
        onSearch={handleSearch}
        search={searchTerm}
      />

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
          <List
            stories={searchedStories}
            onRemoveItem={handleRemoveStory}
          />
        )
      }
    </div>
  );
}

export default App;
