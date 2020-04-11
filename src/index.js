import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const renderRComponent = (component, className) => {

  const wrappers = document.getElementsByClassName(className);
  if (wrappers && wrappers.length > 0)
      Array.from(wrappers)
          .forEach((el, i) =>{
              const c = React.createElement(component, {...el.dataset});
              ReactDOM.render(c, el);
          });
}

renderRComponent(App, 'hacker-stories');
serviceWorker.unregister();
