import React from "react";
import CountryView from "./countryView";

const Countries = (props) => {
  let filteredCountries = props.countries.filter((country) => {
    return country.name.toLowerCase().includes(props.filter.toLowerCase());
  });

  if (filteredCountries.length > 10 && props.filter) {
    return <p>Too many results!</p>;
  }

  if (filteredCountries.length === 1) {
    return filteredCountries.map((country) => (
      <CountryView key={country.name} country={country} open={true} />
    ));
  }

  if (props.filter) {
    return filteredCountries.map((country) => (
      <CountryView
        key={country.name}
        country={country}
        open={false}
        button={true}
      />
    ));
  }

  return filteredCountries.map((country) => (
    <CountryView key={country.name} country={country} open={false} />
  ));
};

export default Countries;
