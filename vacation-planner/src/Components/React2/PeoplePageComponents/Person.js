import React, { useState, useEffect } from "react";

export const Person = props => {
  return (
    <div>
      <p>{props.item.user_name}</p>
      <button
        className="smallButton"
        onClick={() => props.delete(props.item.user_id)}
      >
        X
      </button>
    </div>
  );
};
