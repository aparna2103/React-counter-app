import React, { useEffect, useRef, useState, Component } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [geographyTable, setGeographyTable] = useState([]);

  const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
    };
  };


  const increaseCounter = async () => {
    setCounter(value => value + 1)

    let jsonData = {}

    var latitude = "error";
    var longitude = "error";
    const coords = await getCoords();

    setGeographyTable(geographyTable => [...geographyTable, ...[<div class="geo_row">
      <p>{counter+1}</p>
      <p>{coords.lat}</p>
      <p>{coords.long}</p>
    </div>
    ]])

    // Send data to the backend via POST
    fetch("https://apacounterbackend.herokuapp.com/counter/", {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify({
      "name": counter+1, 
      'latitube':coords.lat, 
      'longitude':coords.long, 
      'geography':"siadjiajsoi"}) // body data type must match "Content-Type" header

    })
  }

  useEffect(() => {
    fetch("https://apacounterbackend.herokuapp.com/counter/")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    }).then((actualData) => {
      let geography_html = []
      if(actualData.length != 0){
        let max = 0;
        geography_html.push(<div class="geo_row">
          <p>Counter</p>
          <p>Latitude</p>
          <p>Longitude</p>
        </div>)
        actualData.forEach(data => {
          geography_html.push(<div class="geo_row">
          <p>{data.name}</p>
          <p>{data.latitube}</p>
          <p>{data.longitude}</p>
        </div>)
        if(data.name > max) max = data.name;
        });
        setGeographyTable(geography_html);
        setCounter(max);
      }
    }).catch((err) => {
      console.log(err.message);
    });
  }, [])

  return (
    <React.Fragment>
      <section>
        Level 1 Challenge - Light hall
        <br />
        Name: Aparna Gupta
        <br />
        Email: agupta53@umd.edu
        <br />
        Please enable location
      </section>
      
      <p className='counter_display'>Counter: {counter}</p>
      <button className='add_counter' onClick={increaseCounter}>+ Add</button>
      {geographyTable}
    </React.Fragment>
  );
}

export default App;