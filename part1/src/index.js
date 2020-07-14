import ReactDOM from "react-dom";
import React, { useState } from "react";
import Filter from "./filter";
import Personform from "./personform";
import Persons from "./persons";
import Header from "./header";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
