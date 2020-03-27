
import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://vacation-planner-2020.herokuapp.com/api/",
    headers: {
      Authorization: token
    }
  });
};