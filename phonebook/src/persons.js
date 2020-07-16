import React from "react";

const Persons = (props) => {
  return props.persons
    .filter((person) => {
      return person.name.toLowerCase().includes(props.filter.toLowerCase());
    })
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
        <button onClick={() => props.removeName(person)}>delete</button>
      </p>
    ));
};

export default Persons;
