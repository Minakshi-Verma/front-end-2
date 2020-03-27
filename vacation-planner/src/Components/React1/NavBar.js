import React from 'react';
import Onboarding from './Onboarding';
import { NavLink } from 'react-router-dom';
// import styled from 'styled-components';

function NavBar (){


    return(
        <div>
            <div>
                <div className="title">
                <h1>Vacation Planner</h1>
                </div>
                <nav>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/protected"}>DashBoard</NavLink>   
                    <NavLink to={"/login"}>Log In</NavLink>
                    <NavLink to={"/register"}>Register</NavLink>
                    <Onboarding/>                                         
                </nav>



            </div>
      
        </div>
    )

}





export default NavBar; 