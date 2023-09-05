

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
// import { Link, useParams, } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import {createTrip} from '../store/allTripsStore'
// // import { fetchUsers } from '../store/allUsersStore'
// import { fetchSingleUser } from '../store/singleUserStore'

export default function CreateTrip() {
  const dispatch = useDispatch()
  // const navigate = useNavigate();
  // console.log("NAV", useNavigate())
  const [name, setName] = useState();
  const [reload, setReload] = useState(1);
  const [createdBy, setCreatedBy] = useState();
  const [location, setLocation] = useState();
  const [length, setLength] = useState();
  const [limit, setLimit] = useState();
  const [dates, setDates] = useState();
  const [response, setResponse] = useState();
  const {id} = useSelector((state) => state.auth )
  // const { userId } = useParams();
  // useEffect(() => {
  //   dispatch(fetchSingleUser(userId))

  //   // Safe to add dispatch to the dependencies array
  // }, [])

  // const user = useSelector((state) => state.singleUser)

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
    setCreatedBy(id)
  }

  const handleChange2 = (event) => {
    event.preventDefault()
    setLocation(event.target.value)

  }

  const handleChange3 = (event) => {
    event.preventDefault()
    setLength(event.target.value)
  }

  const handleChange6 = (event) => {
    event.preventDefault()
    setLimit(event.target.value)
  }

  const handleChange4 = (event) => {
    event.preventDefault()
    setDates(event.target.value)
  }

  const handleChange5 = (event) => {
    event.preventDefault()
    setResponse(event.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const newTrip = {
      name: name,
      location: location,
      length: length,
      limit: limit,
      dates: dates,
      responseDate: response,
      createdBy: createdBy,
    }

    dispatch(createTrip(newTrip))
    setName("")
    setLength("")
    setDates("")
    setResponse("")
    setLimit("")
  }


  return (
    <div >
    <form>
      <div >
        <div>
        <label> <h2 htmlFor="name" style={{marginRight: "10px"}}>Trip Name: </h2></label>
          <input name='name' onChange={handleChange}  type="text" placeholder="Name"/>
        </div>
        {name?
        <div >
          <label> <h2 htmlFor="location" style={{marginRight: "10px"}}>Location: </h2></label>
          <input name='location' onChange={handleChange2}  type="text" placeholder="Location"/> </div> : <div></div>}
        {location?
        <div>
        <label> <h2 htmlFor="length" style={{marginRight: "10px"}}>Length of Trip: </h2></label>
          <input name='length' onChange={handleChange3}  type="text" placeholder="Days"/>
        </div>: <div></div>}
        {length?
        <div>
        <label> <h2 htmlFor="limit" style={{marginRight: "10px"}}>Limit: </h2></label>
          <input name='limit' onChange={handleChange6}  type="text" placeholder="Limit"/>
        </div>: <div></div>}
        {limit?
        <div>
        <label> <h2 htmlFor="dates" style={{marginRight: "10px"}}>Dates: </h2></label>
          <input name='dates' onChange={handleChange4}  type="text" placeholder="Dates"/>
        </div>: <div></div>}
        {dates?
        <div>
        <label> <h2 htmlFor="response" style={{marginRight: "10px"}}>Response By: </h2></label>
          <input name='response' onChange={handleChange5}  type="text" placeholder="Date"/>
        </div>: <div></div>}
      </div>
    </form>
    <div className="text-center">
    <button className="btn btn-primary text-center"  onClick={handleClick}>Add Trip</button>
    </div>
  </div>
  )
}

