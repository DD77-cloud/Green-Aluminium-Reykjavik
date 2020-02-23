import React from 'react'
import { connect } from 'react-redux'
import { findSingleUserThunk } from '../store/user'
import {Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
class UserProfile extends React.Component {
	constructor() {
		super()
		this.state = {
			allUsers: [],
			user: {},
			loggedInUser :{}
		}
	}
	componentDidMount() {
		if (this.props.location && this.props.location.query) {
			console.log(this.props.location, this.props.location.query, 'why')
			this.props.findUser(this.props.location.query.id)
		}
	}
	render() {
		//console.log(this.props.user)
		let ifAdmin
		if (this.props.loggedInUser) ifAdmin = this.props.loggedInUser.admin//checks if the user has admin priveleges 
		let displaybutton = 'none'
		console.log(this.props.islist)
		if (!this.props.islist) displaybutton = 'block' //if the component is used in the 
		//allusers list, 'Go To User Profile' button is displayed. 
		const displayStyle = {
			display: displaybutton
		}
		let displayAdmin = 'none'
		let updateLink = `/profile/update` //masks the fact that other users can be accessed
	
		let uservalue
	
		if (this.props.user.id) uservalue = this.props.user
		else uservalue = this.props.loggedInUser //checks if the user requested their own profile
		//or if admin requested someone elses
	
		if (ifAdmin) {
			this.props.islist ? displayAdmin ='none' : displayAdmin = 'block' //displays admin panel if the user logged in has admin priveleges 
			updateLink = `/profile/${uservalue.id}/update`
		} 

		const adminPanel = {
			display: displayAdmin
		}
		const {  firstName, lastName, address, email } = uservalue
		return (
				<Card bg="dark" text="white" className="ml-auto mr-auto mt-3 w-75">
					<Card.Header><h3>Welcome back, {firstName} {lastName}</h3></Card.Header>
					<Card.Body className="pl-3 pb-3">
						<ListGroup className="mr-auto ml-auto w-50">
						
							<ListGroupItem variant="secondary">Name: {firstName} {lastName}</ListGroupItem>
							<ListGroupItem variant="secondary">Address: {address}</ListGroupItem>
							<ListGroupItem variant="secondary">Email: {email}</ListGroupItem>
						</ListGroup>
						<div style={displayStyle}>
						<LinkContainer to = {updateLink}>
						<Card.Link className="pt-3 pb-3 d-flex justify-content-center">
						<Button variant="light">Edit Info</Button>
						</Card.Link>
					</LinkContainer></div>
					<div style={adminPanel}>
					<Card.Title className="text-center" >Admin Panel</Card.Title>
					<Card.Body className="d-flex justify-content-center">
					<LinkContainer to = "/users"><Card.Link><Button variant="light">All Users</Button></Card.Link></LinkContainer>
					<LinkContainer to = "/transactions"><Card.Link><Button variant="light">All Transactions</Button></Card.Link></LinkContainer>
					</Card.Body></div>
				</Card.Body>
				</Card>
		)
	}
}
const mapState = (state, ownProps) => {
	return {
		user: ownProps.user || state.userState.requestedUser,
		loggedInUser: state.userState.loggedInUser,
		islist: ownProps.islist || false
	}
}

const mapDispatch = dispatch => {
	return {
		findUser: id => dispatch(findSingleUserThunk(id))
	}
}
export default connect(mapState, mapDispatch)(UserProfile)
