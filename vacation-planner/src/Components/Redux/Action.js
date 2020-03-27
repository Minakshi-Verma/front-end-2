import React from "react";

import { useDispatch } from "react-redux";
export const fetchData = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
    const id = localStorage.getItem("userid");
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
};
