import React from "react";

const Filter = (props) => {
  return (
    <div>
      fitler shown with:
      <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  );
};

export default Filter;
