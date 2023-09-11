import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchTrip } from '../store/singleTripStore'
import { useParams, } from 'react-router-dom'
import {fetchUsers} from '../store/allUsersStore'

function EditTrip() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const trip = useSelector((state) => state.singleTrip);
  const users = useSelector((state) => state.allUsers);
  const { tripId } = useParams();


  useEffect(() => {
    dispatch(fetchTrip(tripId));
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  const getNamesFromIds = (ids) => {
    if (!ids || ids.length === 0) return [];
    return users.filter( user => ids.includes(user.id)).map(user => user.username )
};

  return (
    <div>
    <b><u>TRIP</u></b>
          <div>Name: {trip.name}</div>
          <div>Location: {trip.location}</div>
          <div>Length: {trip.length}</div>
          <div>Confirms: {trip.confirms ? trip.confirms.length : 0}</div>
          <div>Names: {getNamesFromIds(trip.confirms).join(', ')}</div>
          <div>Start Date: {trip.startDate}</div>
          <div>End Date: {trip.endDate}</div>
          <div>Response Date: {trip.responseDate}</div>
          <div>Limit: {trip.confirms ?trip.limit == "0" ? "No Limit" : trip.limit == trip.confirms.length ? "Limit Reached" : trip.limit : <div>{trip.limit == "0" ? "No Limit" : <div>{trip.limit}</div> }</div>}</div>
          <div>Created By: {trip.createdBy}</div>
          {/* {trip.createdBy == id ? (
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
          {trip.confirms && trip.confirms.includes(id) ? <div><Link to={`/house/${trip.id}`}>View House</Link></div> : <div></div>}
          <p></p>
          {trip.confirms && trip.confirms.includes(id) ? <div><Link to={`/travel/${trip.id}`}>View Travel</Link></div> : <div></div>}
          <p></p> */}
        </div>

      )
}

export default EditTrip
