import React from "react";
import VacationCard from "../React2/Vacations";
import { useSelector } from "react-redux";

export const VacationList = props => {
  const vacations = useSelector(state => state.vacations);
  return (
    <div className="vacationList">
      {vacations.map((ele, index) => (
        <div>
          <VacationCard
            {...props}
            update={props.update}
            key={ele.vacation_id}
            vacations={ele}
          />
        </div>
      ))}
    </div>
  );
};
