

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
// import { Link, useParams, } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import {createTrip} from '../store/allTripsStore'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
// // import { fetchUsers } from '../store/allUsersStore'
// import { fetchSingleUser } from '../store/singleUserStore'

export default function CreateTrip() {
  const dispatch = useDispatch()
  const [name, setName] = useState();
  const [reload, setReload] = useState(1);
  const [createdBy, setCreatedBy] = useState();
  const [location, setLocation] = useState();
  const [length, setLength] = useState();
  const [limit, setLimit] = useState();
  const [dates, setDates] = useState();
  const [response, setResponse] = useState(new Date('June 11, 2023 09:00:00').getTime());
  const [showDateSelection, setShowDateSelection] = useState(false);
  const [start, setStart] = useState(new Date('June 11, 2023 09:00:00').getTime());
  const [end, setEnd] = useState(new Date('June 11, 2023 09:00:00').getTime());

  const {id} = useSelector((state) => state.auth )


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
    const selectedDate = new Date(event.target.value).getTime();
    setStart(selectedDate)
  }

  const handleChange5 = (event) => {
    event.preventDefault()
    const selectedDate = new Date(event.target.value).getTime();
    setEnd(selectedDate)
  }

  const handleChange7 = (event) => {
    event.preventDefault()
    const selectedDate = new Date(event.target.value).getTime();
    setResponse(selectedDate )
  }

  const handleClick = (e) => {
    e.preventDefault()
    const newTrip = {
      name: name,
      location: location,
      length: length,
      limit: limit,
      startDate: start,
      endDate: end,
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

  const handleToggleDateSelection = () => {
    setShowDateSelection(!showDateSelection);
  };

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
              <label>
                <h2 htmlFor="start" style={{marginRight: "10px"}}>Start Date: </h2>
              </label>

              (
             <>
               <input
                 type="date"
                 id="dateInput"
                 value={new Date(start).toISOString().split('T')[0]}
                 onChange={handleChange4}
               />
               <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={handleToggleDateSelection}>
                 Cancel
               </button>
             </>
           )
            </div>: <div></div>}
            {limit?
              <div>
              <label>
                <h2 htmlFor="end" style={{marginRight: "10px"}}>End Date: </h2>
              </label>

              (
             <>
               <input
                 type="date"
                 id="dateInput"
                 value={new Date(end).toISOString().split('T')[0]}
                 onChange={handleChange5}
               />
               <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={handleToggleDateSelection}>
                 Cancel
               </button>
             </>
           )
            </div>: <div></div>}
        {limit?
        <div>
        <label>
          <h2 htmlFor="response" style={{marginRight: "10px"}}>Respond By: </h2>
        </label>

        (
       <>
         <input
           type="date"
           id="dateInput"
           value={new Date(response).toISOString().split('T')[0]}
           onChange={handleChange7}
         />
         <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={handleToggleDateSelection}>
           Cancel
         </button>
       </>
     )
      </div>: <div></div>}
      </div>
    </form>
    <div className="text-center">
    <button className="btn btn-primary text-center"  onClick={handleClick}>Add Trip</button>
    </div>
  </div>
  )
}

