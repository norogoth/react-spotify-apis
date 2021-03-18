import './App.css';
import React, {useState} from 'react';
import reactDom from 'react-dom';

const clientId = "6cb2e9a6a5d24292a94d3a07f2c9ad2b";
const clientSecret = "3df8daacffae4150a202a52aa9b95f8f";
const tokenUrl = "https://accounts.spotify.com/api/token";
const searchUrl = "https://api.spotify.com/v1/search";
let token = "null";


function App() {
  const [albumList, setAlbumList] = useState([]);
 
  async function handleClick() {
    console.log("just compile pls");
  }

  function getToken() {
    fetch(tokenUrl, {
      method: 'POST',
      body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (response) {
        return response.json();
    }).then (function (data) {
        token = data;
        console.log("Token: ", token);
    });
    return token;
  }

  function searchApi() {
    const searchBox = window.document.getElementById("searchBox");
    const searchString = searchBox.value;

    fetch(searchUrl + "?q=" + searchString + "&type=artist", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(function (response){
      return response.json();
    }).then(function (data){
      console.log(data);
    })
  }

  function testClick() {
    getToken()
    .then(() => searchApi())
  }

  return (
    <div id="mainContainer">
      <h id="mainHeading">Get an Artist's Albums</h>
      <input id="searchBox"></input>
      <button onClick={handleClick}>search</button>
      <button onClick={testClick}>test</button>
      <ul id="albumList">{albumList}</ul>
    </div>
  );
}

export default App;
