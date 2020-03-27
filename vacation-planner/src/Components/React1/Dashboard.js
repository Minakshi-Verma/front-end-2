import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../Utilities/AxiosWithAuth";
import { VacationList } from "../React2/VacationList";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = props => {
  const vacations = useSelector(state => state.vacations);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    console.log("USEEEFT");
    const id = localStorage.getItem("userid");
    if (localStorage.getItem("token")) {
      axiosWithAuth()
        .get(`users/${id}`)
        .then(res => {
          console.log("RES EFFECT", res);

          dispatch({ type: "USER_IS_LOGGED", payload: res.data, pa: true });
        })
        .catch();
    } else {
      dispatch({ type: "USER_IS_LOGGED", pa: false });
    }
  }, [update]);

  const updateFunc = () => {
    setUpdate(!update);
  };

  return (
    <div>
      {/* <Link to = "/login">Log In</Link>  */}
      {/* <h1>Dashboard</h1>
      <h1>Vacations:</h1> */}
      <div className="dash">
        {!vacations ? (
          <div>Add New Vacations!</div>
        ) : (
          <VacationList update={updateFunc} {...props} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
