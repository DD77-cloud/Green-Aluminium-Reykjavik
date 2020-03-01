import React from 'react'
import {connect} from "react-redux";
import {Footer} from './components'
import NavbarRoutes from './navbar-routes'
import Routes from './routes'

const App = ({isLoggedIn}) => {
 let layoutStyle = {display: "block", flexDirection: "column"};
 if(isLoggedIn) layoutStyle = {display: "flex", flexDirection: "row"}
  return (
    <div style = {layoutStyle}>
      <NavbarRoutes />
      <Routes />
      <Footer />
    </div>
  )
}
const mapState = state => {
	return {
		isLoggedIn: !!state.userState.loggedInUser.id
	};
};
export default connect(mapState, null)(App)
