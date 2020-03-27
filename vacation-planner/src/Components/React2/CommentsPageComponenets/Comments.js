import React from "react";

export const Comments = props => {
  return (
    <div>
      <p>
        {`[ ${localStorage.getItem("username")} ] : ${props.item.comment}`}
      </p>
      <button className ="mediumButton" onClick={() => props.edit(props.item)}>edit</button>
      <button className ="smallButton" onClick={() => props.delete(props.item.comment_id)}>X</button>
    </div>
  );
};
