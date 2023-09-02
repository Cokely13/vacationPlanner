import Axios from "axios";

const SET_HOUSES ="SET_HOUSES"
const CREATE_HOUSE = "CREATE_HOUSE"
const DELETE_HOUSE = "DELETE_HOUSE"


export const setHouses = (shows) =>{
  return{
    type: SET_HOUSES,
    shows
  }
};

const _createHouse = (show) => {
  return {
    type: CREATE_HOUSE,
    show,
  };
};

const _deleteHouse = (show) => {
  return {
    type: DELETE_HOUSE,
    show
  };
};

export const fetchHouses = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/houses");
        dispatch(setHouses(data));
  };
};

export const createHouse = (show) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/houses", show);
    dispatch(_createHouse(created));
    // history.push("/houses");
  };
};

export const deleteHouse = (id, history) => {
  return async (dispatch) => {
    const { data: show } = await Axios.delete(`/api/houses/${id}`);
    dispatch(_deleteHouse(show));
    history.push("/houses");
  };
};


const initialState = [];
export default function housesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HOUSES:
      return action.shows;
      case CREATE_HOUSE:
        return [...state, action.show];
        case DELETE_HOUSE:
      return state.filter((show) => show.id !== action.show.id)
      ;
      default:
        return state;
    }
  }
