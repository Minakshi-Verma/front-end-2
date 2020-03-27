import React from "react";

export const Activities = props => {
  return (
    <div className="Act-Card">
      <h4>Description: {props.act.activity_description}</h4>
      <p>timeStart: {props.act.time_start}</p>
      <p>timeEnd: {props.act.time_end}</p>
      <button className ="smallButton" onClick={() => props.delete(props.act.activity_id)}>X</button>
      <button className = "mediumButton" onClick={() => props.edit(props.act)}>Edit</button>
    </div>
  );
};
