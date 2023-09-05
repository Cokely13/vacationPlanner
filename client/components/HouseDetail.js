
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams, } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { createHouse } from '../store/allHousesStore'
// // import { fetchUsers } from '../store/allUsersStore'
// import { fetchSingleUser } from '../store/singleUserStore'

export default function HouseDetail() {
  const dispatch = useDispatch()
  // const navigate = useNavigate();
  // console.log("NAV", useNavigate())
  const [name, setName] = useState();
  const [reload, setReload] = useState(1);
  const [createdBy, setCreatedBy] = useState();
  const [rooms, setRooms] = useState();
  const [price, setPrice] = useState();
  const [pool, setLimit] = useState();
  const {id} = useSelector((state) => state.auth )
  const { tripId } = useParams();
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
    setPrice(event.target.value)

  }

  const handleChange3 = (event) => {
    event.preventDefault()
    setRooms(event.target.value)
  }


  const handleClick = (e) => {
    e.preventDefault()
    const newHouse = {
      name: name,
      price: price,
      rooms: rooms,
      createdBy: createdBy,
      tripId: tripId
    }

    dispatch(createHouse(newHouse))
    setName("")
    setPrice("")
    setRooms("")
  }


  return (
    <div >
    <form>
      <div >
        <div>
        <label> <h2 htmlFor="name" style={{marginRight: "10px"}}>House Name: </h2></label>
          <input name='name' onChange={handleChange}  type="text" placeholder="Name"/>
        </div>
        {name?
        <div >
          <label> <h2 htmlFor="price" style={{marginRight: "10px"}}>Price: </h2></label>
          <input name='price' onChange={handleChange2}  type="text" placeholder="Price"/> </div> : <div></div>}
        {price?
        <div>
        <label> <h2 htmlFor="rooms" style={{marginRight: "10px"}}># of Rooms: </h2></label>
          <input name='rooms' onChange={handleChange3}  type="text" placeholder="Rooms"/>
        </div>: <div></div>}
        </div>
    </form>
    <div className="text-center">
    <button className="btn btn-primary text-center"  onClick={handleClick}>Add House</button>
    </div>
  </div>
  )
}
