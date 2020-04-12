import React, { useState, useEffect } from 'react';
import List from './components/List';
import Search from './components/Search';
import initialStories from './constants/Stories'

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

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const getAsyncStories = () =>
    new Promise(resolve => 
        setTimeout(
          () => resolve({ data: { stories: initialStories }}),
          2000
        )
    );

  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then(result => {
        setStories(result.data.stories);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories)
  }

  const searchedStories = stories.filter(
    story => story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search
        onSearch={handleSearch}
        search={searchTerm}
      />

      <hr />

      {isError && <p>Something went wrong ...</p>}
      
      {isLoading ? (
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
