import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../Utilities/AxiosWithAuth";
import { Person } from "./Person";

export const PeopleList = props => {
  const [searchFor, setSearchFor] = useState({ name: "" });
  const [allUsers, setAllUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/vacations/${props.id}/users`)
      .then(res => {
        console.log("GET_VACA_USERS", res.data);
        setPeopleList(res.data);
      })
      .catch(err => console.log(err));
  }, [update]);

  useEffect(() => {
    axiosWithAuth()
      .get("/users")
      .then(res => {
        // console.log("ALL_USERS", res);
        setAllUsers(res.data.users);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setSearchFor({ ...searchFor, [e.target.name]: e.target.value });
  };

  const handleDelete = id => {
    axiosWithAuth()
      .delete(`/vacations/${props.id}/user/${id}`)
      .then(res => {
        console.log(res);
        setUpdate(!update);
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("ALL PEEPS", allUsers);
    var exists = allUsers.find(ele => ele.user_name === searchFor.name);
    var alreadyAdded = peopleList.some(ele => ele.user_id === exists.user_id);
    console.log("EXISTS", exists);
    console.log("Added", alreadyAdded);

    if (exists) {
      if (alreadyAdded) {
        return alert("already added");
      }
      var toAdd = { user_id: exists.user_id, vacation_id: props.id };
      axiosWithAuth()
        .post(`/vacations/adduser`, toAdd)
        .then(res => {
          console.log("ADDED_USER?", res);
          setUpdate(!update);
        })
        .catch(err => console.log(err));
    } else {
      alert("no user found");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="commentBtn"
            onChange={handleChange}
            placeholder="Search for useer to add"
            value={searchFor.name}
            name="name"
          />
          <button className="logItBtn" type="submit">
            Add
          </button>
        </form>
      </div>
      {!peopleList ? (
        <h3>Add some friends</h3>
      ) : (
        peopleList.map(ele => (
          <Person key={ele.user_id} delete={handleDelete} item={ele} />
        ))
      )}
    </div>
  );
};
