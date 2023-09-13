

import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrips } from '../store/allTripsStore';

function CalendarComponent() {
  const dispatch = useDispatch();
  const tripsFromStore = useSelector((state) => state.allTrips);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTrips()); // Fetch the trips when the component mounts
  }, [dispatch]);

  console.log("trips", tripsFromStore)


  const tileContent = ({ date, view }) => {
    // Filter out trips for the specific date
    const tripsOnDate = tripsFromStore.filter(trip => {
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      return date >= startDate && date <= endDate;
    });

    // Map over the trips and return the colored divs
    return tripsOnDate.map(trip => {
      const isConfirmed = trip.confirms && trip.confirms.includes(id); // added a null check for trip.confirms
      return (
        <div
          key={trip.id}
          style={{
            backgroundColor: isConfirmed ? 'yellow' : 'gray',
            margin: '2px',
            padding: '2px'
          }}>
          {trip.name}
        </div>
      );
    });
  };


  return (
    <Calendar tileContent={tileContent} />
  );
}

export default CalendarComponent;
