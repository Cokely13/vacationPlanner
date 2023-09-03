import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {fetchTrips} from '../store/allTripsStore'
import { Link } from 'react-router-dom'

function TripList() {
  const dispatch = useDispatch()
  const trips = useSelector((state) => state.allTrips)
  const {id} = useSelector((state) => state.auth )


  useEffect(() => {
    dispatch(fetchTrips())
  }, [])

  return (
    <div>
    <div>TripList</div>
    {trips ? trips.map((trip) => {
      return (
      <div key={trip.id}>
        <b><u>TRIP</u></b>
      <div>Name: {trip.name} </div>
      <div>Location: {trip.location} </div>
      <div>Length: {trip.length} </div>
      <div>Response Date: {trip.responseDate} </div>
      <div>Created By: {trip.createdBy} </div>
      {trip.createdBy == id ? <div><Link to='/edittrip'>Edit Trip</Link></div> : <div></div>}
      <p></p>
      </div>
    )}) :  <div>Non</div>}
    <div>Location:  / Date: </div>
    </div>

  )
}

export default TripList
