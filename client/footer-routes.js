import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Footer, StockList} from './components'
import {me} from './store/index'
class FooterRoutes extends Component {
    render() {
        const {isLoggedIn} = this.props
        return (
        <div>
        {isLoggedIn ? (<StockList/>) : (<Footer/>)}
        </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn:  !!state.userState.loggedInUser.id //|| !!state.user.user
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
export default connect(mapState, mapDispatch)(FooterRoutes)

/**
 * PROP TYPES
 */
FooterRoutes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
