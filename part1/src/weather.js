import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = (props) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=" +
          process.env.REACT_APP_API_KEY +
          "&query=" +
          props.country.name
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);
  console.log(weather.length, weather);
  if (weather.location) {
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p>
          <strong>Temperature: </strong>
          {weather.current.temperature}
        </p>
        <img
          width="100px"
          height="100px"
          src={weather.current.weather_icons[0]}
        />
        <p>
          <strong>Wind: </strong>
          {weather.current.wind_speed} mph direction {weather.current.wind_dir}{" "}
        </p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Weather;
