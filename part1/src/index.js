import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import Filter from "./filter";
import Countries from "./countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
