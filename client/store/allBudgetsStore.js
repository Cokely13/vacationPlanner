import Axios from "axios";

const SET_BUDGETS ="SET_BUDGETS"
const CREATE_BUDGET = "CREATE_BUDGET"
const DELETE_BUDGET = "DELETE_BUDGET"


export const setBudgets = (shows) =>{
  return{
    type: SET_BUDGETS,
    shows
  }
};

const _createBudget = (show) => {
  return {
    type: CREATE_BUDGET,
    show,
  };
};

const _deleteBudget = (show) => {
  return {
    type: DELETE_BUDGET,
    show
  };
};

export const fetchBudgets = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/budgets");
        dispatch(setBudgets(data));
  };
};

export const createBudget = (show) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/budgets", show);
    dispatch(_createBudget(created));
    // history.push("/budgets");
  };
};

export const deleteBudget = (id, history) => {
  return async (dispatch) => {
    const { data: show } = await Axios.delete(`/api/budgets/${id}`);
    dispatch(_deleteBudget(show));
    history.push("/budgets");
  };
};


const initialState = [];
export default function budgetsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUDGETS:
      return action.shows;
      case CREATE_BUDGET:
        return [...state, action.show];
        case DELETE_BUDGET:
      return state.filter((show) => show.id !== action.show.id)
      ;
      default:
        return state;
    }
  }
