import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import Filter from "./filter";
import Personform from "./personform";
import Persons from "./persons";
import Header from "./header";
import service from "./services/phoneService.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    service.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    let checkObject = persons.find((el) => el.name === newName);

    if (checkObject) {
      if (
        window.confirm(
          `${nameObject.name} already exist, do you want to update the number?`
        )
      ) {
        service
          .updateName(checkObject.id, nameObject)
          .then((personResponse) => {
            setPersons(
              persons.map((person) =>
                person.id !== personResponse.id ? person : personResponse
              )
            );
          });
      }
    } else {
      service.addName(nameObject).then((name) => {
        setPersons(persons.concat(name));
        setNewName("");
        setNewNumber("");
      });
    }
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

  const removeName = (personObject) => {
    if (window.confirm(`Do you really want to delete ${personObject.name}?`)) {
      service.removeName(personObject.id).then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== personObject.id));
      });
    }
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
      <Persons persons={persons} filter={filter} removeName={removeName} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
