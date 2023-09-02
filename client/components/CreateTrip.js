// import React from 'react'

// function CreateTrip() {
//   return (
//     <div>
//     <div>CreateTrip</div>
//     <div>Name:</div>
//     <div>Location:</div>
//     <div>Length:</div>
//     <div>Dates Available:</div>
//     <div>Kids:</div>
//     <div>Respond By:</div>
//     </div>
//   )
// }

// export default CreateTrip

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
  const [channel, setChannel] = useState();
  const [image, setImage] = useState();
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
    // console.log("HA", like)
  }

  const handleChange2 = (event) => {
    event.preventDefault()
    setChannel(event.target.value)
    // console.log("HA", like)
  }

  const handleChange3 = (event) => {
    event.preventDefault()
    setImage(event.target.value)
    // console.log("HA", like)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const newTrip = {
      name: name,
      channel: channel,
      createdBy: createdBy,
      image: image
    }

    dispatch(createTrip(newTrip))
    setName("")
  }


  return (
    <div >
    <form>
      <div >
        <div>
        <label> <h2 htmlFor="showname" style={{marginRight: "10px"}}>Show Name: </h2></label>
          <input name='name' onChange={handleChange}  type="text" placeholder="Name"/>
        </div>
        {name?
        <div >
          <label> <h2 htmlFor="channel" style={{marginRight: "10px"}}>Channel: </h2></label>
          <div>
          <select  onChange={handleChange2} name="channel" className="form-control">
        <option disabled selected value="Channel">Select Channel</option>
          <option value="HBO">HBO</option>
          <option value="NETFLIX">NETFLIX</option>
          <option value="DISNEY">DISNEY</option>
          <option value="AMAZON">AMAZON</option>
          <option value="OTHER">OTHER</option>
          </select>
        </div> </div> : <div></div>}
        {channel?
        <div>
        <label> <h2 htmlFor="image" style={{marginRight: "10px"}}>Image: </h2></label>
          <input name='image' onChange={handleChange3}  type="text" placeholder="Copy Image Address"/>
        </div>: <div></div>}
      </div>
    </form>
    <div className="text-center">
    <button className="btn btn-primary text-center"  onClick={handleClick}>Add Show</button>
    </div>
  </div>
  )
}

