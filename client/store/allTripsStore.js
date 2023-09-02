import Axios from "axios";

const SET_TRIPS ="SET_TRIPS"
const CREATE_TRIP = "CREATE_TRIP"
const DELETE_TRIP = "DELETE_TRIP"


export const setTrips = (shows) =>{
  return{
    type: SET_TRIPS,
    shows
  }
};

const _createTrip = (show) => {
  return {
    type: CREATE_TRIP,
    show,
  };
};

const _deleteTrip = (show) => {
  return {
    type: DELETE_TRIP,
    show
  };
};

export const fetchTrips = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/trips");
        dispatch(setTrips(data));
  };
};

export const createTrip = (show) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/trips", show);
    dispatch(_createTrip(created));
    // history.push("/trips");
  };
};

export const deleteTrip = (id, history) => {
  return async (dispatch) => {
    const { data: show } = await Axios.delete(`/api/trips/${id}`);
    dispatch(_deleteTrip(show));
    history.push("/trips");
  };
};


const initialState = [];
export default function tripsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRIPS:
      return action.shows;
      case CREATE_TRIP:
        return [...state, action.show];
        case DELETE_TRIP:
      return state.filter((show) => show.id !== action.show.id)
      ;
      default:
        return state;
    }
  }
