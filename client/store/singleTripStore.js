import axios from "axios";

// Action Types
const SET_SINGLE_TRIP = "SET_SINGLE_TRIP";
const UPDATE_SINGLE_TRIP = "UPDATE_SINGLE_TRIP";
const TOKEN = "token";

// Action creators
export const _setSingleTrip= (tripdata) => {
  return {
    type: SET_SINGLE_TRIP,
    tripdata,
  };
};

const _updateSingleTrip = (tripdata) => {
  return {
    type: UPDATE_SINGLE_TRIP,
    tripdata,
  };
};

//Thunks
export const fetchTrip = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/trips/${id}`);
    dispatch(_setSingleTrip(data));
  };
};

export const updateSingleTrip = (trip) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/trips/${trip.id}`, trip);
        const { data: tripData } = await axios.get(`/api/trips/${trip.id}`);
        dispatch(_updateSingleTrip(tripData));
      }
     catch (error) {
      console.log("TRIP", trip)
    }
  };
};

// reducer
const initialState = [];
const singleTripReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_TRIP:
      return action.tripdata;
    case UPDATE_SINGLE_TRIP:
      return action.tripdata;
    default:
      return state;
  }
};

export default singleTripReducer;
