import React, { useState } from "react";
import { axiosWithAuth } from "../Utilities/AxiosWithAuth";
import { useDispatch } from "react-redux";

const LogIn = props => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    user_name: "",
    user_password: ""
  });

  const handleChanges = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    console.log("Submitting", user);
    e.preventDefault();
    axiosWithAuth()
      .post("https://vacation-planner-2020.herokuapp.com/api/auth/login", user)
      .then(response => {
        console.log("Success", response);
        dispatch({ type: "LOGIN_USER", payload: response.data });
        props.history.push("/dashboard");
        props.update();
      })
      .catch(error => console.log("ERROR", error.response));
  };

  return (
    <div class = "editVacation">
      <h2>Sign In</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="login"></label>
        <input
          className="input"
          id="username"
          type="text"
          name="user_name"
          onChange={handleChanges}
          placeholder="username"
          value={user.user_name}
          required
        />
        <label htmlFor="password"></label>
        <input
          className="input"
          id="password"
          type="password"
          name="user_password"
          onChange={handleChanges}
          placeholder="password"
          value={user.user_password}
          required
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default LogIn;
