import './App.css';
import React, {useState, useEffect} from 'react';
import reactDom from 'react-dom';

const clientId = "6cb2e9a6a5d24292a94d3a07f2c9ad2b";
const clientSecret = "3df8daacffae4150a202a52aa9b95f8f";
const tokenUrl = "https://accounts.spotify.com/api/token";
const searchUrl = "https://api.spotify.com/v1/search";
let token = "null";

function Muffins() {
  const [muffinList, setMuffinList] = useState([]);
  const muffinUrl = `http://127.0.0.1:8000/test`;

  async function getMuffins() {
    return fetch(muffinUrl, {
      method: 'GET',
    }).then(function (response) {
      return response.json();
    }).then (function (data) {
      //console.log("data: ",data["data"]);
      let newMuffinList = [];
      for (const [key, value] of Object.entries(data["data"])){
        //console.log("*",value);
        const row = document.createElement('tr');
        const name = document.createElement('td');
        name.innerHTML = data["data"]["name"];
        const desc = document.createElement('td');
        desc.innerHTML = data["data"]["description"];
        row.appendChild(name);
        row.appendChild(desc);
        newMuffinList.push(row);
      }
      setMuffinList(newMuffinList);
      console.log("muffinlist",muffinList);
      return data["data"];

    });
  }

  useEffect(() => {
    getMuffins()
  }, [])

  return(
    <div>
      <h1>Muffins</h1>
      <table id="muffinTable">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Descrition</th>
          </tr>
          {muffinList.map(muffin => {
            return (
              <tr key = {muffin["id"]}>
                <td>{muffin["name"]}</td>
                <td>{muffin["description"]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [albumList, setAlbumList] = useState([]);
 
  async function handleClick() {
    console.log("just compile pls");
  }

  async function getToken() {
      return fetch(tokenUrl, {
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
      <h2 id="mainHeading">Get an Artist's Albums</h2>
      <input id="searchBox"></input>
      <button onClick={handleClick}>search</button>
      <button onClick={testClick}>test</button>
      <ul id="albumList">{albumList}</ul>
      <Muffins/>
    </div>
  );
}

export default App;
