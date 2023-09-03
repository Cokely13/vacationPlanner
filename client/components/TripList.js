import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {fetchTrips} from '../store/allTripsStore'

function TripList() {
  const dispatch = useDispatch()
  const trips = useSelector((state) => state.allTrips)

  // console.log("trips", trips)

  useEffect(() => {
    dispatch(fetchTrips())
  }, [])

  return (
    <div>
    <div>TripList</div>
    {trips ? trips.map((trip) => {
      return (
      <div>
      <div>Name: {trip.name} </div>
      <div>Location: {trip.location} </div>
      <div>Length: {trip.length} </div>
      <div>Response Date: {trip.responseDate} </div>
      </div>
    )}) :  <div>Non</div>}
    <div>Location:  / Date: </div>
    </div>

  )
}

export default TripList
