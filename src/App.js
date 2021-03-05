import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import reactDom from 'react-dom';

function App() {
  const [albumList, setAlbumList] = useState([]);
  
  return (
    <div id="mainContainer">
      <h id="mainHeading">Get an Artist's Albums</h>
      <input id="artistSearch"></input>
      <ul id="albumList">{albumList}</ul>
    </div>

  );
}

export default App;
