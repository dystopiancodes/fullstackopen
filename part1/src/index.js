import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.vote}>{props.type}</button>;
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  let good = props.good;
  let bad = props.bad;
  let neutral = props.neutral;

  if (good > 0 || bad > 0 || neutral > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + bad + neutral} />
          <Statistic
            text="average"
            value={(good - bad) / (good + bad + neutral)}
          />
          <Statistic
            text="positive"
            value={good / (good + bad + neutral) + "%"}
          />
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button type="good" vote={() => setGood(good + 1)} />
      <Button type="neutral" vote={() => setNeutral(neutral + 1)} />
      <Button type="bad" vote={() => setBad(bad + 1)} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
