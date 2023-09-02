import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import usersReducer from './allUsersStore'
import tripsReducer from './allTripsStore'
import travelsReducer from './allTravelsStore'
import budgetsReducer from './allBudgetsStore'
import houseReducer from './allHousesStore'
import singleHouseReducer from './singleHouseStore'
import singleBudgetReducer from './singleBudgetStore'
import singleTravelReducer from './singleTravelStore'
import singleUserReducer from './singleUserStore'
import singleTripReducer from './singleTripStore'

const reducer = combineReducers({ auth,
  allUsers: usersReducer,
  allTrips: tripsReducer,
  allTravels: travelsReducer,
  allBudgets: budgetsReducer,
  allHouses: houseReducer,
  singleHouse: singleHouseReducer,
  singleBudget: singleBudgetReducer,
  singleTrave: singleTravelReducer,
  singleUser: singleUserReducer,
  singleTrip: singleTripReducer
 })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
