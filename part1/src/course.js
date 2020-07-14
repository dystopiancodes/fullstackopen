import React, { useState } from "react";
const Course = (props) => {
  const total = props.course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <div>
      <h1>{props.course.name}</h1>
      {props.course.parts.map((course) => (
        <p key={course.id}>
          {course.name} {course.exercises}
        </p>
      ))}
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
