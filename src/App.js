import './App.css';
import React, {useState} from 'react';
import reactDom from 'react-dom';

const token = "BQB2j85HfD91v4tKyd3CfuLyRt5WyqnqLLndDBwmpYRbCRRCcMxWOxQ_wr4AFXXwnVtT5NaIKdv59cSllRl3M4kc7ow9dfn-caH1xqSXVv97COzWceqys13a99rm6XfDhqasQuqnAdyv";
const url = "https://api.spotify.com/v1/search";

function App() {
  const [albumList, setAlbumList] = useState([]);
 
  function search(searchString) {
    console.log("search was called");
    //run API
  }

  async function handleClick() {
    let promise = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (promise.ok) {
      let json = await promise.json();
    } else {
      console.log(promise);
      alert(`HTTP Error: ${promise.status}`);
    }
  }

  return (
    <div id="mainContainer">
      <h id="mainHeading">Get an Artist's Albums</h>
      <input id="artistSearch"></input>
      <button onClick={handleClick}>search</button>
      <ul id="albumList">{albumList}</ul>
    </div>

  );
}

export default App;
