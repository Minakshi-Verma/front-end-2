import React, { useState } from "react";
import { axiosWithAuth } from "../Utilities/AxiosWithAuth";
import { useDispatch } from "react-redux";

const AddVacation = props => {

  const [vacation, setVacation] = useState({
    vacation_name: "",
    vacation_description: ""
  });

  const dispatch = useDispatch();

  const handleChanges = e => {
    let value = e.target.value;
    setVacation({
      ...vacation,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/vacations`, vacation)
      .then(response => {
        console.log(response);
        dispatch({ type: "ADD_Vacation", payload: response.data });
        props.history.push("/dashboard");
      })
      .catch(error => {
        console.log("Data was not returned addVacation.js", error);
        props.history.push("/dashboard/");
      });
  };

  return (
    <div className ="addVacationCard"> 
      <h2>Add Vacation</h2>
      <form className ="form" onSubmit={handleSubmit}>
        <input className ='input'
          name="vacation_name"
          placeholder="Vacation Name"
          type="text"
          placeholder ="Destination"
          value={vacation.vacation_name}
          onChange={handleChanges}
          required
        />
        <input className ='input'
          name="vacation_description"
          placeholder="Description"
          type="textarea"
          placeholder ="Details"
          value={vacation.vacation_description}
          onChange={handleChanges}
          required
        />
        <button className = "button">Submit</button>
      </form>
    </div>
  );
};
export default AddVacation;
