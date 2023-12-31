import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import TripDetails from './components/TripDetails'
import TravelInfo from './components/TravelInfo'
import TripList from './components/TripList'
import CreateTrip from './components/CreateTrip'
import {me} from './store'
import Budget from './components/Budget';
import EditTrip from './components/EditTrip';
import CalendarComponent from './components/CalendarComponent';
import HouseDetail from './components/HouseDetail';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/create" component={CreateTrip} />
            <Route exact path="/tripdetails/:tripId" component={TripDetails} />
            <Route exact path="/list" component={TripList} />
            <Route exact path="/calendar" component={CalendarComponent} />
            <Route exact path="/edittrip/:tripId" component={EditTrip} />
            <Route exact path="/travel/:tripId" component={TravelInfo} />
            <Route exact path="/budget" component={Budget} />
            <Route exact path="/house/:tripId" component={HouseDetail} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
