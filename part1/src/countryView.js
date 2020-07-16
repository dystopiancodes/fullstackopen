import React, { useState, useEffect } from "react";
import Weather from "./weather";

const CountryView = (props) => {
  const [fullView, setFullView] = useState(false);

  const handleView = (e) => {
    setFullView(true);
  };

  if (fullView || props.open) {
    return (
      <div>
        <h1> {props.country.name}</h1>
        <p>Capital: {props.country.capital}</p>
        <p>Population: {props.country.population}</p>
        <h2>Languages</h2>
        <ul>
          {props.country.languages.map((language) => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
        <img width="100px" height="100px" src={props.country.flag} />
        <Weather country={props.country} />
      </div>
    );
  } else {
    return (
      <div>
        <p key={props.country.name}>
          {props.country.name}
          {props.button === true ? (
            <button onClick={() => handleView()}>show</button>
          ) : (
            ""
          )}
        </p>
      </div>
    );
  }
};

export default CountryView;
