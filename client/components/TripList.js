// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect, useState } from 'react'
// import {fetchTrips} from '../store/allTripsStore'
// import { updateSingleTrip } from '../store/singleTripStore'
// import { Link } from 'react-router-dom'

// function TripList() {
//   const dispatch = useDispatch()
//   const trips = useSelector((state) => state.allTrips)
//   const {id} = useSelector((state) => state.auth )
//   const [tripUpdated, setTripUpdated] = useState(false);

//   useEffect(() => {
//     dispatch(fetchTrips())
//   }, [])


//   useEffect(() => {
//     if (tripUpdated) {
//         dispatch(fetchTrips());
//         setTripUpdated(false);
//     }
// }, [tripUpdated]);


//   const handleClick = (tripId, confirms, action) => {
//     let updatedConfirms = [];
//     setTripUpdated(true);
//     if (action === 'confirm') {
//         updatedConfirms = confirms
//             ? (confirms.includes(id) ? confirms : [...confirms, id])
//             : [id];
//     } else if (action === 'decline') {
//         updatedConfirms = confirms.filter(userId => userId !== id);
//     }

//     const newTrip = {
//         id: tripId,
//         confirms: updatedConfirms
//     };

//     dispatch(updateSingleTrip(newTrip));
// }


//   return (
//     <div>
//     <div>TripList</div>
//     {trips ? trips.map((trip) => {
//       return (
//       <div key={trip.id}>
//         <b><u>TRIP</u></b>
//       <div>Name: {trip.name} </div>
//       <div>Location: {trip.location} </div>
//       <div>Length: {trip.length} </div>
//       <div>Confirms: {trip.confirms ? trip.confirms.length : 0} </div>
//       <div>Response Date: {trip.responseDate} </div>
//       <div>Created By: {trip.createdBy} </div>
//       {trip.createdBy == id ? <div><Link to='/edittrip'>Edit Trip</Link></div> : <div></div>}
//       {
//     trip.confirms && trip.confirms.includes(id)
//         ? <button className="btn btn-danger text-center" onClick={() => handleClick(trip.id, trip.confirms, 'decline')}>Decline</button>
//         : <button className="btn btn-primary text-center" onClick={() => handleClick(trip.id, trip.confirms, 'confirm')}>Confirm Attendance</button>
// }
//       <p></p>
//       </div>
//     )}) :  <div>Non</div>}
//     <div>Location:  / Date: </div>
//     </div>

//   )
// }

// export default TripList

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTrips } from '../store/allTripsStore';
import { updateSingleTrip } from '../store/singleTripStore';
import { Link } from 'react-router-dom';

function TripList() {
  const dispatch = useDispatch();
  const tripsFromStore = useSelector((state) => state.allTrips);
  const { id } = useSelector((state) => state.auth);

  // Use local state
  const [localTrips, setLocalTrips] = useState([]);

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);

  useEffect(() => {
    setLocalTrips(tripsFromStore); // copy trips from Redux store to local state
  }, [tripsFromStore]);

  const handleClick = (tripId, confirms, action) => {
    let updatedConfirms = [];

    if (action === 'confirm') {
      updatedConfirms = confirms
        ? (confirms.includes(id) ? confirms : [...confirms, id])
        : [id];
    } else if (action === 'decline') {
      updatedConfirms = confirms.filter(userId => userId !== id);
    }

    const newTrip = {
      id: tripId,
      confirms: updatedConfirms
    };

    // Update the local state
    const updatedTrips = localTrips.map(trip => {
      if (trip.id === tripId) {
        return { ...trip, confirms: updatedConfirms };
      }
      return trip;
    });
    setLocalTrips(updatedTrips);

    // Dispatch to update the store (and eventually the database)
    dispatch(updateSingleTrip(newTrip));
  };

  return (
    <div>
      <div>TripList</div>
      {localTrips ? localTrips.map((trip) => (
        <div key={trip.id}>
          <b><u>TRIP</u></b>
          <div>Name: {trip.name}</div>
          <div>Location: {trip.location}</div>
          <div>Length: {trip.length}</div>
          <div>Confirms: {trip.confirms ? trip.confirms.length : 0}</div>
          <div>Response Date: {trip.responseDate}</div>
          <div>Created By: {trip.createdBy}</div>
          {trip.createdBy == id ? (
            <div><Link to='/edittrip'>Edit Trip</Link></div>
          ) : (
            <div></div>
          )}
          {trip.confirms && trip.confirms.includes(id) ? (
            <button className="btn btn-danger text-center" onClick={() => handleClick(trip.id, trip.confirms, 'decline')}>Decline</button>
          ) : (
            <button className="btn btn-primary text-center" onClick={() => handleClick(trip.id, trip.confirms, 'confirm')}>Confirm Attendance</button>
          )}
          <p></p>
        </div>
      )) : (
        <div>None</div>
      )}
      <div>Location: / Date:</div>
    </div>
  );
}

export default TripList;

