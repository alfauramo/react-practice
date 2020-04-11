import React from 'react';
import Item from './Item';

const List = props => {
    
  const {stories} = props;
  
  return (
      stories.map((item, i) => <Item key={i} item={item}/>)
  ); 
    
}

export default List;