import Axios from "axios";

const SET_TRAVELS ="SET_TRAVELS"
const CREATE_TRAVEL = "CREATE_TRAVEL"
const DELETE_TRAVEL = "DELETE_TRAVEL"


export const setTravels = (shows) =>{
  return{
    type: SET_TRAVELS,
    shows
  }
};

const _createTravel = (show) => {
  return {
    type: CREATE_TRAVEL,
    show,
  };
};

const _deleteTravel = (show) => {
  return {
    type: DELETE_TRAVEL,
    show
  };
};

export const fetchTravels = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/travels");
        dispatch(setTravels(data));
  };
};

export const createTravel = (show) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/travels", show);
    dispatch(_createTravel(created));
    // history.push("/travels");
  };
};

export const deleteTravel = (id, history) => {
  return async (dispatch) => {
    const { data: show } = await Axios.delete(`/api/travels/${id}`);
    dispatch(_deleteTravel(show));
    history.push("/travels");
  };
};


const initialState = [];
export default function travelsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRAVELS:
      return action.shows;
      case CREATE_TRAVEL:
        return [...state, action.show];
        case DELETE_TRAVEL:
      return state.filter((show) => show.id !== action.show.id)
      ;
      default:
        return state;
    }
  }
