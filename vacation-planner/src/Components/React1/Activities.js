import React,{useState, useEffect} from 'react';
import Axios from 'axios';


const Activities = ()  => {

const [activity, setActivity] = useState([])

const [activities, setActivities] = useState([])


useEffect (() =>{
Axios.get (`------------`)
    .then (res =>{
        console.log("I am the axios call from activities", res)
    })
    .catch(err => {
        console.log("I am the error from activities", err)
    })


})

const submitForm = () => {

}


    return (

        <form onSubmit ={submitForm}>
        <label htmlFor ="activities"> What activity would you like to do!!</label>
          <field as="select" name="activities">
          <option disabled>Choose an Option</option>
          <option value="Music_food">Music &amp; Food</option>
          <option value="ThemeParks">Theme Parks</option>
          <option value="Museums">Museums</option>
          <option value="shopping">Shopping</option>
          <option value="hiking">Hiking</option>
          <option value="Others">Others</option>
         </field>             
         </form>


    )
}

export default Activities