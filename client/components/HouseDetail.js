
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams, } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { createHouse } from '../store/allHousesStore'
import { fetchHouses } from '../store/allHousesStore'
import {fetchUsers} from '../store/allUsersStore'
import {updateSingleHouse} from '../store/singleHouseStore'
import { fetchTrip } from '../store/singleTripStore'
// // import { fetchUsers } from '../store/allUsersStore'
// import { fetchSingleUser } from '../store/singleUserStore'

export default function HouseDetail() {
  const dispatch = useDispatch()
  // const navigate = useNavigate();
  // console.log("NAV", useNavigate())
  const users = useSelector((state) => state.allUsers);
  const [name, setName] = useState();
  const [reload, setReload] = useState(1);
  const [createdBy, setCreatedBy] = useState();
  const [rooms, setRooms] = useState();
  const [price, setPrice] = useState();
  const [addHouse, setAddHouse] = useState()
  const [pool, setLimit] = useState();
  const {id} = useSelector((state) => state.auth )
  const trip = useSelector((state) => state.singleTrip);
  const [localHouses, setLocalHouses] = useState([]);
  const { tripId } = useParams();


  const house = trip.house

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  useEffect(() => {
    dispatch(fetchTrip(tripId));
  }, []);

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

  const handleAdd = (e) => {
    e.preventDefault()
    setAddHouse(true)
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

  const handleClick2 = (houseId, confirms, action) => {
    let updatedConfirms = [];

    if (action === 'confirm') {
      updatedConfirms = confirms
        ? (confirms.includes(id) ? confirms : [...confirms, id])
        : [id];
    } else if (action === 'decline') {
      updatedConfirms = confirms.filter(userId => userId !== id);
    }

    const newHouse = {
      id: houseId,
      confirms: updatedConfirms
    };

    // Update the local state
    const updatedHouses = localHouses.map(house => {
      if (house.id === houseId) {
        return { ...house, confirms: updatedConfirms };
      }
      return house;
    });
    setLocalHouses(updatedHouses);

    // Dispatch to update the store (and eventually the database)
    dispatch(updateSingleHouse(newHouse));
  };

  const getNamesFromIds = (ids) => {
    if (!ids || ids.length === 0) return [];
    return users.filter( user => ids.includes(user.id)).map(user => user.username )
};

  return (
    <div >
      {trip.createdBy == id && !addHouse ? <div><button className="btn btn-primary text-center"  onClick={handleAdd}>New House</button></div> : <div></div>}
      {addHouse ? (<div>

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
  ) : <div></div>}
  {house ?
  <div>
  <div>Name: {house.name}</div>
  <div>Rooms: {house.price}</div>
  <div>Price: {house.rooms}</div>
  <div>Confirms: {house.confirms ? house.confirms.length : 0}</div>
  <div>Names: {getNamesFromIds(trip.confirms).join(', ')}</div>
  {house.confirms && house.confirms.includes(id) ? (
            <button className="btn btn-danger text-center" onClick={() => handleClick2(house.id, house.confirms, 'decline')}>Decline</button>
          ) : (
            <button className="btn btn-primary text-center" onClick={() => handleClick2(house.id, house.confirms, 'confirm')}>Confirm Attendance</button>
          )}

  </div> : <div></div>}
  </div>
)}
