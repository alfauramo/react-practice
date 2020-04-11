import React from 'react';
import Item from './Item';

const List = ({ stories }) => {

  return (
    stories.map((item, i) => <Item key={i} {...item} />)
  );

}

export default List;