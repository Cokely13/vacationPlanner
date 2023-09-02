import axios from "axios";

// Action Types
const SET_SINGLE_BUDGET = "SET_SINGLE_BUDGET";
const UPDATE_SINGLE_BUDGET = "UPDATE_SINGLE_BUDGET";
const TOKEN = "token";

// Action creators
export const _setSingleBudget= (budgetdata) => {
  return {
    type: SET_SINGLE_BUDGET,
    budgetdata,
  };
};

const _updateSingleBudget = (budgetdata) => {
  return {
    type: UPDATE_SINGLE_BUDGET,
    budgetdata,
  };
};

//Thunks
export const fetchBudget = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/budgets/${id}`);
    dispatch(_setSingleBudget(data));
  };
};

export const updateSingleBudget = (budget, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/budgets/${budget.id}`, budget);
        const { data: budgetData } = await axios.get(`/api/budgets/${budget.id}`);
        dispatch(_updateSingleBudget(budgetData));
        history.push(`/budgets/${budget.id}`)
      }
     catch (error) {
      console.log("BUDGET", budget)
    }
  };
};

// reducer
const initialState = [];
const singleBudgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_BUDGET:
      return action.budgetdata;
    case UPDATE_SINGLE_BUDGET:
      return action.budgetdata;
    default:
      return state;
  }
};

export default singleBudgetReducer;
