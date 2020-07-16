import React from "react";
const Notification = (props) => {
  const styles = {
    color: props.color,
    border: `solid 1px ${props.color}`,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  };
  return <div style={styles}>{props.message}</div>;
};

export default Notification;
