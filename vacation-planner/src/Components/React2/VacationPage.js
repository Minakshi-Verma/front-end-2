import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../Utilities/AxiosWithAuth";
//components
import { ActivitiesList } from "./VactionPageComponents/ActivitiesList";
import { CommentsList } from "./CommentsPageComponenets/CommentsList";
import { PeopleList } from "./PeoplePageComponents/PeopleList";

export const VacationPage = props => {
  const [vacation, setVacation] = useState({
    vacation_id: props.match.params.id,
    vacation_name: "",
    vacation_description: ""
  });

  useEffect(() => {
    axiosWithAuth()
      .get(`/vacations/${props.match.params.id}`)
      .then(res => {
        // console.log("VacationPage:", res);
        setVacation(res.data.vacation);
        clickHandle(localStorage.getItem("selected"));
      })
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  const clickHandle = name => {
    localStorage.setItem("selected", name);
    var act = document.getElementById("acts");
    var coms = document.getElementById("coms");
    var peeps = document.getElementById("peeps");
    var clckAct = document.getElementById("clkAct");
    var clckCom = document.getElementById("clkCom");
    var clckPeep = document.getElementById("clkPeep");
    switch (name) {
      case "comments":
        clckCom.classList.add("selected");
        coms.classList.remove("hide");
        act.classList.add("hide");
        clckAct.classList.remove("selected");
        peeps.classList.add("hide");
        clckPeep.classList.remove("selected");
        break;
      case "people":
        coms.classList.add("hide");
        clckCom.classList.remove("selected");
        act.classList.add("hide");
        clckAct.classList.remove("selected");
        peeps.classList.remove("hide");
        clckPeep.classList.add("selected");
        break;
      case "activities":
        coms.classList.add("hide");
        clckCom.classList.remove("selected");
        clckAct.classList.add("selected");
        act.classList.remove("hide");
        peeps.classList.add("hide");
        clckPeep.classList.remove("selected");
        break;
      default:
        break;
    }
  };

  return (
    <div class ="tripCard">
      <h1>{vacation.vacation_name}</h1>
      <h3>Description: {vacation.vacation_description}</h3>
      <div class ="tripDetails"> 
        <h3 id="clkCom" onClick={() => clickHandle("comments")}>
          Comments
        </h3>
        <h3 id="clkPeep" onClick={() => clickHandle("people")}>
          People {}
        </h3>
        <h3 id="clkAct" onClick={() => clickHandle("activities")}>
          Activities{" "}
        </h3>
      </div>
      <div id="acts">
        <ActivitiesList id={props.match.params.id} />
      </div>
      <div id="coms" className="hide">
        <CommentsList id={props.match.params.id} />
      </div>
      <div id="peeps" className="hide">
        <PeopleList id={props.match.params.id} />
      </div>
    </div>
  );
};
