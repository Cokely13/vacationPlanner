import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTrips } from '../store/allTripsStore';
import { updateSingleTrip } from '../store/singleTripStore';
import {fetchUsers} from '../store/allUsersStore'
import { Link } from 'react-router-dom';

function TripList() {
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


  const getNamesFromIds = (ids) => {
    if (!ids || ids.length === 0) return [];
    return users.filter( user => ids.includes(user.id)).map(user => user.username )
};

  return (
    <div>
      <div>TripList</div>
      {localTrips ? localTrips.map((trip) => (
        <div key={trip.id}>
          <b><u>TRIP</u></b>
          <div>Name: <Link to={`/tripdetails/${trip.id}`}>{trip.name}</Link></div>
          <div>Location: {trip.location}</div>
          <div>Length: {trip.length}</div>
          <div>Confirms: {trip.confirms ? trip.confirms.length : 0}</div>
          <div>Names: {getNamesFromIds(trip.confirms).join(', ')}</div>
          <div>Start Date: {trip.startDate}</div>
          <div>End Date: {trip.endDate}</div>
          <div>Response Date: {trip.responseDate}</div>
          <div>
    Invites: {getNamesFromIds(trip.invite).join(', ')}
    {/* {trip.invite ?
        trip.invite.map((invite, index) => (
            <span key={index}>
                {invite}
                {index !== trip.invite.length - 1 ? ', ' : ''}
            </span>
        ))
        :
        <div></div>
    } */}
</div>
          {/* <div>Invites: {trip.confirms ?trip.limit == "0" ? "No Limit" : trip.limit == trip.confirms.length ? "Limit Reached" : trip.limit : <div>{trip.limit == "0" ? "No Limit" : <div>{trip.limit}</div> }</div>}</div> */}
          <div>Created By: {trip.createdBy}</div>
          {trip.createdBy == id ? (
            <div><Link to={`/edittrip/${trip.id}`}>Edit Trip</Link></div>
          ) : (
            <div></div>
          )}
          {trip.confirms && trip.confirms.includes(id) ? (
            <button className="btn btn-danger text-center" onClick={() => handleClick(trip.id, trip.confirms, 'decline')}>Decline</button>
          ) : (
            <button className="btn btn-primary text-center" onClick={() => handleClick(trip.id, trip.confirms, 'confirm')}>Confirm Attendance</button>
          )}
          <p></p>
          {trip.confirms && trip.confirms.includes(id) ? <div><Link to={`/house/${trip.id}`}>View House</Link></div> : <div></div>}
          <p></p>
          {trip.confirms && trip.confirms.includes(id) ? <div><Link to={`/travel/${trip.id}`}>View Travel</Link></div> : <div></div>}
          <p></p>
        </div>
      )) : (
        <div>None</div>
      )}
    </div>
  );
}

export default TripList;

