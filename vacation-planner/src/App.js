// Dependencies
import React, { useEffect, useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
// Components
import LogIn from "./Components/React1/LogIn";
import Register from "./Components/React1/Register";
import PrivateRoute from "./Components/Utilities/PrivateRoute";
import AddVacation from "./Components/React2/AddVacation";
import UpdateVacation from "./Components/React2/UpdateVacation";
import Dashboard from "./Components/React1/Dashboard";
import CommentForm from "./Components/React1/CommentForm";
import { MessagePage } from "./Components/React2/MessageingComponet/MessagePage";
import { VacationPage } from "./Components/React2/VacationPage";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  var name = localStorage.getItem("username");
  var token = localStorage.getItem("token");

  const signOut = () => {
    dispatch({ type: "LOGOUT_USER" });
    doUpdate();
  };
  useEffect(() => {}, [update]);

  // https://vacation-planner-2020.herokuapp.com/api/users/3
  const doUpdate = () => {
    setUpdate(!update);
  };
  return (
    <div className="App">
      <h1>Vacation Planner</h1>
      {name && <h3>Welcome {name}</h3>}
      <nav className="nav">
        <div className="nav-links">
          {!token && <Link to="/">Sign In</Link>}
          {!token && <Link to="/signup">Sign Up</Link>}
          {token && <Link to="/dashboard/">Dashboard</Link>}
          {token && <Link to="/addvacation">Add Vacation</Link>}
          {token && <Link to="/Messages">Messages</Link>}
          {token && (
            <Link to="/" onClick={signOut}>
              Sign Out
            </Link>
          )}
        </div>
      </nav>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <LogIn update={doUpdate} {...props} />}
        />
        <Route
          path="/signup"
          render={props => <Register update={doUpdate} {...props} />}
        />
        <Route
          path="/addvacation"
          component={props => <AddVacation {...props} />}
        />
        <Route
          path="/updatevacation/:id"
          component={props => <UpdateVacation {...props} />}
        />
        <Route path="/Comments">
          <CommentForm />
        </Route>
        <PrivateRoute
          path="/dashboard"
          component={props => <Dashboard {...props} />}
        />
        <PrivateRoute
          path="/vacationpage/:id"
          component={props => <VacationPage {...props} />}
        />
        <PrivateRoute
          path="/Messages"
          component={props => <MessagePage {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
