import React from "react";

const Persons = (props) => {
  return props.persons
    .filter((person) => {
      return person.name.toLowerCase().includes(props.filter.toLowerCase());
    })
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
};

export default Persons;
