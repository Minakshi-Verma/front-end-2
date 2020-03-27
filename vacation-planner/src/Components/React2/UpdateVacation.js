import React, { useState, useEffect } from "react";
// import Axios from "axios";
import { axiosWithAuth } from "../Utilities/AxiosWithAuth";

function UpdateVacation(props) {
  const [vacation, setVacation] = useState({
    id: props.match.params.id,
    isLogged: false,
    user: {
      user_Id: null,
      user_Name: null
    },
    vacations: []
  });

  useEffect(() => {
    console.log(props.match.params.id);
    axiosWithAuth()
      .get(`/vacations/${props.match.params.id}`)
      .then(res => {
        console.log("RESPONSE!!!!!", res);
        setVacation(res.data.vacation);
      })
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Vacation:", vacation);
    axiosWithAuth()
      .put(`vacations/${props.match.params.id}`, vacation)
      .then(res => {
        console.log(res);
        props.history.push(`/dashboard`);
      })
      .catch(err => console.log(err));
  };

  const handleChanges = e => {
    setVacation({
      ...vacation,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className = "editVacation"> 
    <h2>Edit Vacation</h2>
      <form className = "form" onSubmit={handleSubmit} className="form">
        <input className = "input"
          name="vacation_name"
          type="text"
          value={vacation.vacation_name}
          onChange={handleChanges}
          required
        />
        <input className = " input"
          name="vacation_description"
          type="textarea"
          value={vacation.vacation_description}
          onChange={handleChanges}
          required
        />
        <button className = "button" type="submit">Done</button>
      </form>
    </div>
  );
}
export default UpdateVacation;
