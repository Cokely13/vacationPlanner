import axios from "axios";

// Action Types
const SET_SINGLE_HOUSE = "SET_SINGLE_HOUSE";
const UPDATE_SINGLE_HOUSE = "UPDATE_SINGLE_HOUSE";
const TOKEN = "token";

// Action creators
export const _setSingleHouse= (housedata) => {
  return {
    type: SET_SINGLE_HOUSE,
    housedata,
  };
};

const _updateSingleHouse = (housedata) => {
  return {
    type: UPDATE_SINGLE_HOUSE,
    housedata,
  };
};

//Thunks
export const fetchHouse = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/houses/${id}`);
    dispatch(_setSingleHouse(data));
  };
};

export const updateSingleHouse = (house, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/houses/${house.id}`, house);
        const { data: houseData } = await axios.get(`/api/houses/${house.id}`);
        dispatch(_updateSingleHouse(houseData));
        history.push(`/houses/${house.id}`)
      }
     catch (error) {
      console.log("HOUSE", house)
    }
  };
};

// reducer
const initialState = [];
const singleHouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_HOUSE:
      return action.housedata;
    case UPDATE_SINGLE_HOUSE:
      return action.housedata;
    default:
      return state;
  }
};

export default singleHouseReducer;
