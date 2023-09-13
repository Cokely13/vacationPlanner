
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams, } from 'react-router-dom'
import { createTravel } from '../store/allTravelsStore'
import {fetchUsers} from '../store/allUsersStore'
import {updateSingleTravel} from '../store/singleTravelStore'
import { fetchTrip } from '../store/singleTripStore'

export default function TravelInfo() {
  const dispatch = useDispatch()
  const currentDate = new Date().getTime()
  const users = useSelector((state) => state.allUsers);
  const [targetDate, setTargetDate] = useState(currentDate);
  const [city, setCity] = useState();
  const [reload, setReload] = useState(1);
  const [createdBy, setCreatedBy] = useState();
  const [addTravel, setAddTravel] = useState()
  const {id} = useSelector((state) => state.auth )
  const trip = useSelector((state) => state.singleTrip);
  const [arrival, setArrival] = useState(currentDate);
  const [departure, setDeparture] = useState(currentDate);
  const [showDateSelection, setShowDateSelection] = useState(false);
  const [localTravels, setLocalTravels] = useState([]);
  const { tripId } = useParams();



  const travels = trip.travels


  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  useEffect(() => {
    dispatch(fetchTrip(tripId));
  }, [reload]);

  useEffect(() => {
    if (trip && trip.travels) {
        setLocalTravels(trip.travels);
    }
}, [trip]);




  const findConfirmedTravelIdForUser = () => {
    const confirmedTravel = travels.find(h => h.confirms && h.confirms.includes(id));
    return confirmedTravel ? confirmedTravel.id : null;
};

const sortedTravels = travels && travels.length
? travels.sort((a, b) => {
    const aIsConfirmed = a.confirms && a.confirms.includes(id);
    const bIsConfirmed = b.confirms && b.confirms.includes(id);
    return bIsConfirmed - aIsConfirmed; // will place confirmed travel at the top
  })
: [];

  const handleChange = (event) => {
    event.preventDefault()
    setCity(event.target.value)
    setCreatedBy(id)
  }

  const handleChange2 = (event) => {
    event.preventDefault()
    const selectedDate = new Date(event.target.value).getTime();
    // setTargetDate(selectedDate);
    setArrival(selectedDate)

  }

  const handleChange3 = (event) => {
    event.preventDefault()
    const selectedDate = new Date(event.target.value).getTime();
    setDeparture(selectedDate)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    setAddTravel(true)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const newTravel = {
      city: city,
      arrival: arrival,
      departure: departure,
      createdBy: createdBy,
      tripId: tripId
    }


    dispatch(createTravel(newTravel))
    setCity("")
    setArrival("")
    setDeparture("")
  }


  const handleClick2 = (travelId, confirms, action) => {
    let updatedConfirms = [...(confirms || [])];

    if (action === 'confirm') {
        if (!updatedConfirms.includes(id)) {
            updatedConfirms.push(id);
        }
    } else if (action === 'decline') {
        updatedConfirms = updatedConfirms.filter(userId => userId !== id);
    } else if (action === 'switch') {
        const otherTravelId = findConfirmedTravelIdForUser();
        if (otherTravelId) {
            const otherTravel = localTravels.find(h => h.id === otherTravelId);
            if (otherTravel && otherTravel.confirms) {
                otherTravel.confirms = otherTravel.confirms.filter(userId => userId !== id);
                dispatch(updateSingleTravel(otherTravel)); // Update the other travel
            }
        }
        if (!updatedConfirms.includes(id)) {
            updatedConfirms.push(id);
        }
    }

    const newTravel = {
        id: travelId,
        confirms: updatedConfirms
    };

    const updatedTravels = localTravels.map(travel => {
      if (travel.id === travelId) {
          return { ...travel, confirms: updatedConfirms };
      }
      return travel;
  });
  setLocalTravels(updatedTravels);


    dispatch(updateSingleTravel(newTravel));

    setReload(prevReload => prevReload + 1);
};

  const getNamesFromIds = (ids) => {
    if (!ids || ids.length === 0) return [];
    return users.filter( user => ids.includes(user.id)).map(user => user.username )
};

const handleToggleDateSelection = () => {
  setShowDateSelection(!showDateSelection);
};

  return (
    <div >
      <h1>Destination: {trip.location}</h1>
      <h1>Dates: {trip.startDate} to {trip.endDate} </h1>

      {trip.createdBy == id && !addTravel ? <div><button className="btn btn-primary text-center"  onClick={handleAdd}>New Travels</button></div> : <div></div>}
      {addTravel ? (<div>

    <form>
      <div >
        <div>
        <label> <h2 htmlFor="city" style={{marginRight: "10px"}}>Travels City: </h2></label>
          <input name='city' onChange={handleChange}  type="text" placeholder="City"/>
        </div>
        {city?
           <div>
           <label>
             <h2 htmlFor="arrival" style={{marginRight: "10px"}}>Arrival: </h2>
           </label>

           (
          <>
            <input
              type="date"
              id="dateInput"
              value={new Date(arrival).toISOString().split('T')[0]}
              onChange={handleChange2}
            />
            <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={handleToggleDateSelection}>
              Cancel
            </button>
          </>
        )
         </div>: <div></div>}
        {city?
          <div>
          <label>
            <h2 htmlFor="departure" style={{marginRight: "10px"}}>Departure: </h2>
          </label>
          (
          <>
            <input
              type="date"
              id="dateInput"
              value={new Date(departure).toISOString().split('T')[0]}
              onChange={handleChange3}
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
    <button className="btn btn-primary text-center"  onClick={handleClick}>Add Travels</button>
    </div>
  </div>
  ) : <div></div>}
    {travels ? sortedTravels.map((travel) => {
                const confirmedTravelId = findConfirmedTravelIdForUser();
                const isAlreadyConfirmed = travel.confirms && travel.confirms.includes(id);

                return (
                    <div key={travel.id} style={isAlreadyConfirmed ? {border: "3px solid black", padding: "5px", marginBottom: "10px"} : {}}>
                        <div>City: {travel.city}</div>
                        <div>Arrival Date: {travel.arrival}</div>
                        <div>Departure Date: {travel.departure}</div>
                        <div>Confirms: {travel.confirms ? travel.confirms.length : 0}</div>
                        <div>Names: {getNamesFromIds(travel.confirms).join(', ')}</div>
                        <button
                            className={isAlreadyConfirmed ? "btn btn-danger text-center" : "btn btn-primary text-center"}
                            onClick={() => handleClick2(travel.id, travel.confirms, isAlreadyConfirmed ? 'decline' : confirmedTravelId ? 'switch' : 'confirm')}>
                            {isAlreadyConfirmed ? "Decline" : confirmedTravelId ? "Switch Confirm" : "Confirm Attendance"}
                        </button>
                    </div>
                );
            }) : <div></div>}
  </div>
)}
