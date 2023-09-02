import axios from "axios";

// Action Types
const SET_SINGLE_TRAVEL = "SET_SINGLE_TRAVEL";
const UPDATE_SINGLE_TRAVEL = "UPDATE_SINGLE_TRAVEL";
const TOKEN = "token";

// Action creators
export const _setSingleTravel= (traveldata) => {
  return {
    type: SET_SINGLE_TRAVEL,
    traveldata,
  };
};

const _updateSingleTravel = (traveldata) => {
  return {
    type: UPDATE_SINGLE_TRAVEL,
    traveldata,
  };
};

//Thunks
export const fetchTravel = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/travels/${id}`);
    dispatch(_setSingleTravel(data));
  };
};

export const updateSingleTravel = (travel, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/travels/${travel.id}`, travel);
        const { data: travelData } = await axios.get(`/api/travels/${travel.id}`);
        dispatch(_updateSingleTravel(travelData));
        history.push(`/travels/${travel.id}`)
      }
     catch (error) {
      console.log("TRAVEL", travel)
    }
  };
};

// reducer
const initialState = [];
const singleTravelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_TRAVEL:
      return action.traveldata;
    case UPDATE_SINGLE_TRAVEL:
      return action.traveldata;
    default:
      return state;
  }
};

export default singleTravelReducer;
