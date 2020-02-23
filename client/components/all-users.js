import React, { Component } from 'react'
import { connect } from 'react-redux'
import { allUsersThunk, me } from '../store/index'
import { UserProfile } from './index.js'
import {Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
class AllUsers extends Component {
	componentDidMount() {
		this.props.loadData()
	}

	render() {
		return (
			<div>
				{this.props.allUsers &&
					this.props.allUsers.map(user => {
						return (
							<div key={user.id}>
								<UserProfile user={user} islist={true} />
								<LinkContainer to = {{pathname:"/profile", query:{id:`${user.id}`}}} className="ml-50">
									<Button variant="danger">Go to User Page</Button>
								</LinkContainer>
							</div>
						)
					})}
			</div>
		)
	}
}

const mapState = state => {
	return {
		allUsers: state.userState.allUsers
	}
}
const mapDispatch = dispatch => {
	return {
		loadData: () => dispatch(allUsersThunk())
	}
}

export default connect(mapState, mapDispatch)(AllUsers)
