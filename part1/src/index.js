import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import Filter from "./filter";
import Personform from "./personform";
import Persons from "./persons";
import Header from "./header";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((el) => el.name === newName)) {
      alert(`${newName} already exist!`);
      return false;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
    console.log(persons);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Header text="Phonebook" />
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <Header text="Add new" />
      <Personform
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <Header text="Numbers" />
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
