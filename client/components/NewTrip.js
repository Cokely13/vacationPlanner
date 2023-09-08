import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTrips } from '../store/allTripsStore';
import { updateSingleTrip } from '../store/singleTripStore';
import {fetchUsers} from '../store/allUsersStore'
import { Link } from 'react-router-dom';

function NewTrip() {
  const dispatch = useDispatch();
  const tripsFromStore = useSelector((state) => state.allTrips);
  const users = useSelector((state) => state.allUsers);
  const { id } = useSelector((state) => state.auth);


  console.log("users", tripsFromStore)

  // Use local state
  const [localTrips, setLocalTrips] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);

  useEffect(() => {
    if(tripsFromStore && tripsFromStore.length > 0) {
        const sortedTrips = [...tripsFromStore].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLocalTrips([sortedTrips[0]]);
    }
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


  const getNamesFromIds = (ids) => {
    if (!ids || ids.length === 0) return [];
    return users.filter( user => ids.includes(user.id)).map(user => user.username )
};

  return (
    <div>
      <div>New Trip</div>
      {localTrips && localTrips[0] ? (
        <div key={localTrips[0].id}>
          <b><u>TRIP</u></b>
          <div>Name: <Link to={`/tripdetails/${localTrips[0].id}`}>{localTrips[0].name}</Link></div>
          <div>Location: {localTrips[0].location}</div>
          <div>Length: {localTrips[0].length}</div>
          <div>Confirms: {localTrips[0].confirms ? localTrips[0].confirms.length : 0}</div>
          <div>Names: {getNamesFromIds(localTrips[0].confirms).join(', ')}</div>
          <div>Start Date: {localTrips[0].startDate}</div>
          <div>End Date: {localTrips[0].endDate}</div>
          <div>Response Date: {localTrips[0].responseDate}</div>
          <div>Limit: {localTrips[0].confirms ?localTrips[0].limit == "0" ? "No Limit" : localTrips[0].limit == localTrips[0].confirms.length ? "Limit Reached" : localTrips[0].limit : <div>{localTrips[0].limit == "0" ? "No Limit" : <div>{localTrips[0].limit}</div> }</div>}</div>
          <div>Created By: {localTrips[0].createdBy}</div>
          {localTrips[0].createdBy == id ? (
            <div><Link to='/edittrip'>Edit Trip</Link></div>
          ) : (
            <div></div>
          )}
          {localTrips[0].confirms && localTrips[0].confirms.includes(id) ? (
            <button className="btn btn-danger text-center" onClick={() => handleClick(localTrips[0].id, localTrips[0].confirms, 'decline')}>Decline</button>
          ) : (
            <button className="btn btn-primary text-center" onClick={() => handleClick(localTrips[0].id, localTrips[0].confirms, 'confirm')}>Confirm Attendance</button>
          )}
          <p></p>
          {localTrips[0].confirms && localTrips[0].confirms.includes(id) ? <div><Link to={`/house/${localTrips[0].id}`}>View House</Link></div> : <div></div>}
          <p></p>
          {localTrips[0].confirms && localTrips[0].confirms.includes(id) ? <div><Link to={`/travel/${localTrips[0].id}`}>View Travel</Link></div> : <div></div>}
          <p></p>
        </div>
      ) : (
        <div>None</div>
      )}
    </div>
  );
}

export default NewTrip;

