import React from 'react';
import Item from './Item';

const List = ({ stories, onRemoveItem }) => {

  return (
    stories.map((item, i) =>
      <Item
        key={i}
        item={item}
        onRemoveItem={onRemoveItem}
      />)
  );

}

export default List;