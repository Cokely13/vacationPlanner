
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams, } from 'react-router-dom'
import { createHouse } from '../store/allHousesStore'
import {fetchUsers} from '../store/allUsersStore'
import {updateSingleHouse} from '../store/singleHouseStore'
import { fetchTrip } from '../store/singleTripStore'

export default function HouseDetail() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.allUsers);
  const [name, setName] = useState();
  const [reload, setReload] = useState(1);
  const [createdBy, setCreatedBy] = useState();
  const [rooms, setRooms] = useState();
  const [price, setPrice] = useState();
  const [addHouse, setAddHouse] = useState()
  const {id} = useSelector((state) => state.auth )
  const trip = useSelector((state) => state.singleTrip);
  const [localHouses, setLocalHouses] = useState([]);
  const { tripId } = useParams();



  const houses = trip.houses

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  useEffect(() => {
    dispatch(fetchTrip(tripId));
  }, [reload]);

  useEffect(() => {
    if (trip && trip.houses) {
        setLocalHouses(trip.houses);
    }
}, [trip]);



  const findConfirmedHouseIdForUser = () => {
    const confirmedHouse = houses.find(h => h.confirms && h.confirms.includes(id));
    return confirmedHouse ? confirmedHouse.id : null;
};

const sortedHouses = houses && houses.length
? houses.sort((a, b) => {
    const aIsConfirmed = a.confirms && a.confirms.includes(id);
    const bIsConfirmed = b.confirms && b.confirms.includes(id);
    return bIsConfirmed - aIsConfirmed; // will place confirmed house at the top
  })
: [];

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
    let updatedConfirms = [...(confirms || [])];

    if (action === 'confirm') {
        if (!updatedConfirms.includes(id)) {
            updatedConfirms.push(id);
        }
    } else if (action === 'decline') {
        updatedConfirms = updatedConfirms.filter(userId => userId !== id);
    } else if (action === 'switch') {
        const otherHouseId = findConfirmedHouseIdForUser();
        if (otherHouseId) {
            const otherHouse = localHouses.find(h => h.id === otherHouseId);
            if (otherHouse && otherHouse.confirms) {
                otherHouse.confirms = otherHouse.confirms.filter(userId => userId !== id);
                dispatch(updateSingleHouse(otherHouse)); // Update the other house
            }
        }
        if (!updatedConfirms.includes(id)) {
            updatedConfirms.push(id);
        }
    }

    const newHouse = {
        id: houseId,
        confirms: updatedConfirms
    };

    const updatedHouses = localHouses.map(house => {
      if (house.id === houseId) {
          return { ...house, confirms: updatedConfirms };
      }
      return house;
  });
  setLocalHouses(updatedHouses);


    dispatch(updateSingleHouse(newHouse));

    setReload(prevReload => prevReload + 1);
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
    {houses ? sortedHouses.map((house) => {
                const confirmedHouseId = findConfirmedHouseIdForUser();
                const isAlreadyConfirmed = house.confirms && house.confirms.includes(id);

                return (
                    <div key={house.id} style={isAlreadyConfirmed ? {border: "3px solid black", padding: "5px", marginBottom: "10px"} : {}}>
                        <div>Name: {house.name}</div>
                        <div>Price: {house.price}</div>
                        <div>Rooms: {house.rooms}</div>
                        <div>Confirms: {house.confirms ? house.confirms.length : 0}</div>
                        <div>Names: {getNamesFromIds(house.confirms).join(', ')}</div>
                        <button
                            className={isAlreadyConfirmed ? "btn btn-danger text-center" : "btn btn-primary text-center"}
                            onClick={() => handleClick2(house.id, house.confirms, isAlreadyConfirmed ? 'decline' : confirmedHouseId ? 'switch' : 'confirm')}>
                            {isAlreadyConfirmed ? "Decline" : confirmedHouseId ? "Switch Confirm" : "Confirm Attendance"}
                        </button>
                    </div>
                );
            }) : <div></div>}
  </div>
)}
