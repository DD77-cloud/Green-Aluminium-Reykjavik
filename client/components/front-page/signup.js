import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { USstates } from '../index.js'
import {auth} from "../../store/index";
import {Form, Button, Tab, Row, Col, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import "./signup.css";
/**
 * COMPONENT
 */
const SignUp = props => {
	const {name, displayName, handleSubmit, error} = props;
	const [activeTab, setActiveTab] = React.useState("first")
	const handleTabSwitch = (tabIn) => setActiveTab(tabIn)
	return (
		<Tab.Container id="signUpForm" activeKey={activeTab}>
		<Row id="signUpFormRow" className="w-75">
			<Col sm={3}>
			
			<Nav variant="pills"  className="flex-column mt-5" id="signUpTabs">
				<i className="fas fa-user-plus fa-7x mx-auto"></i>
				<Navbar.Text className="mx-auto">
					Create An Account
				</Navbar.Text>
				<Nav.Item>
				<Nav.Link className=".rounded-0 mt-3" eventKey="first" onClick={()=>handleTabSwitch('first')}>Account Information</Nav.Link>
				</Nav.Item>
				<Nav.Item>
				<Nav.Link className="rounded-0" eventKey="second" onClick={()=>handleTabSwitch('second')}>Personal Information</Nav.Link>
				</Nav.Item>
			</Nav>
			</Col>
			<Col sm={3}>
			<Form id="signUp"
				onSubmit={handleSubmit}
				name={name}
				className="mt-3 p-3"
			>
			<Tab.Content>
			
				<Tab.Pane eventKey="first" className="fade">
					<Form.Group>
					<Form.Group controlId="firstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your First Name"
							/>
						</Form.Group>
						<Form.Group controlId="lastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your Last Name"
							/>
						</Form.Group>
						<Form.Group controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter your email" />
					<Form.Text className="text-light">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
					<Form.Text className="text-light">
						
							<span>
								{" "}
								Password must be between 5 and 15 characters
								long and include at least one of each of the
								following:
								<li>A lower case letter</li>
								<li>An upper case letter</li>
								<li>A number</li>
								<li>A special character</li>
							</span>
					
					</Form.Text>
				</Form.Group>
				</Form.Group>
				<Button variant="success" onClick={()=>handleTabSwitch('second')}>Next</Button>
				</Tab.Pane>
				<Tab.Pane eventKey="second" className="fade">
					<Form.Group controlId="apt">
							<Form.Label>Apt/Unit</Form.Label>
							<Form.Control
								type="text"
								
							/>
						</Form.Group>
					<Form.Group controlId="houseNumber">
						<Form.Label>House/Building Number</Form.Label>
						<Form.Control
							type="text"
						
						/>
					</Form.Group>
					<Form.Group controlId="street">
						<Form.Label>Street</Form.Label>
						<Form.Control
							type="text"
							
						/>
					</Form.Group>
					<Form.Group controlId="zipcode">
						<Form.Label>Zipcode</Form.Label>
						<Form.Control
							type="text"
							
						/>
					</Form.Group>
					<Form.Group controlId="city">
						<Form.Label>City</Form.Label>
						<Form.Control
							type="text"
							
						/>
					</Form.Group>
					<Form.Group controlId = "state">
					<Form.Label>State: </Form.Label>
					<USstates/>
					</Form.Group>
					<Form.Group controlId="country">
						<Form.Label>Country</Form.Label>
						<Form.Control
							type="text"
							
						/>
					</Form.Group>
				<Button variant="success" type="submit">
					{displayName}
				</Button>{" "}
				<a href="/auth/google">
					<Button variant="success">{displayName} with Google</Button>
				</a>
				{error && error.response && <div> {error.response.data} </div>}
			
				</Tab.Pane>
				
			</Tab.Content>
			</Form>
			</Col>
		</Row>
	</Tab.Container>
	);
};

const mapLogin = state => {
	return {
		name: "login",
		displayName: "Login",
		error: state.userState.loggedInUser.error,
		cart: state.cart
	};
};

const mapSignup = state => {
	return {
		name: "signup",
		displayName: "Sign Up",
		error: state.userState.loggedInUser.error
	};
};

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();

			const formName = evt.target.name;
			const formInput = {
				email: evt.target.email.value,
				password: evt.target.password.value,
				firstName: evt.target.firstName.value,
				lastName: evt.target.lastName.value,
				apt: evt.target.apt.value,
				houseNumber: evt.target.houseNumber.value,
				street: evt.target.street.value,
				zipcode: evt.target.zipcode.value,
				city: evt.target.city.value,
				state: evt.target.state.value,
				country: evt.target.country.value,
			};
			dispatch(auth(formInput, formName));
		}
	};
};

export default connect(mapSignup, mapDispatch)(SignUp);

/**
 * PROP TYPES
 */
// SignUp.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	displayName: PropTypes.string.isRequired,
// 	handleSubmit: PropTypes.func.isRequired,
// 	error: PropTypes.object
// };
