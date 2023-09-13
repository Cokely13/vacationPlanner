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
  const [timeFilter, setTimeFilter] = useState('all'); // "upcoming", "past", or "all"
  const [confirmationFilter, setConfirmationFilter] = useState('all'); // "confirmed", "unconfirmed", or "all"
  const users = useSelector((state) => state.allUsers);
  const { id } = useSelector((state) => state.auth);
  const [countdowns, setCountdowns] = useState({});


  const getRemainingTime = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (diff <= 0) {
      return "Expired";
    }

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const timeFilterFunction = (trip) => {
    if (timeFilter === 'upcoming') {
      return new Date(trip.endDate) > new Date();
    }
    if (timeFilter === 'past') {
      return new Date(trip.endDate) <= new Date();
    }
    return true; // for "all"
  }

  const confirmationFilterFunction = (trip) => {
    const confirms = trip.confirms || []; // if trip.confirms is null or undefined, use an empty array

    if (confirmationFilter === 'confirmed') {
      return confirms.includes(id);
    }
    if (confirmationFilter === 'unconfirmed') {
      return !confirms.includes(id);
    }
    return true; // for "all"
  }


  // Use local state
  const [localTrips, setLocalTrips] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      localTrips.forEach(trip => {
        newCountdowns[trip.id] = getRemainingTime(trip.responseDate);
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);  // cleanup on component unmount
  }, [localTrips]);

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);

  useEffect(() => {
    setLocalTrips(tripsFromStore); // copy trips from Redux store to local state
  }, [tripsFromStore]);

  const userCanSeeTrip = (trip) => {
    // Check if the user is the creator of the trip
    if (trip.createdBy === id) {
      return true;
    }

    // Check if the user is invited to the trip
    if (trip.invite.includes(id)) {
      return true;
    }

    return false;
  }

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
      <div>
  <label>
    Time Filter:
    <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
      <option value="all">All</option>
      <option value="upcoming">Upcoming</option>
      <option value="past">Past</option>
    </select>
  </label>

  <label>
    Confirmation Filter:
    <select value={confirmationFilter} onChange={(e) => setConfirmationFilter(e.target.value)}>
      <option value="all">All</option>
      <option value="confirmed">Confirmed</option>
      <option value="unconfirmed">Unconfirmed</option>
    </select>
  </label>
</div>
      {localTrips ? localTrips.filter(userCanSeeTrip).filter(timeFilterFunction).filter(confirmationFilterFunction).map((trip) => (
        <div key={trip.id}>
          <b><u>TRIP</u></b>
          <div>Name: <Link to={`/tripdetails/${trip.id}`}>{trip.name}</Link></div>
          <div>Location: {trip.location}</div>
          <div>Length: {trip.length}</div>
          <div>Confirms: {trip.confirms ? trip.confirms.length : 0}</div>
          <div>Names: {getNamesFromIds(trip.confirms).join(', ')}</div>
          <div>Start Date: {trip.startDate}</div>
          <div>End Date: {trip.endDate}</div>
          <div>Response Date: {trip.responseDate} (Countdown: {countdowns[trip.id] || "Calculating..."})</div>
          <div>
    Invites: {getNamesFromIds(trip.invite).join(', ')}
    </div>

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

