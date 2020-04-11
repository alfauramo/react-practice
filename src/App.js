import React, { useState, useEffect } from 'react';
import List from './components/List';
import Search from './components/Search';

const App = props => {

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = useState(
      localStorage.getItem(key) || initialState
    );

    useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 3,
      objectID: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ];

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

      {/* creating an instance of List component */}
      <List stories={searchedStories} />
    </div>
  );
}

export default App;
