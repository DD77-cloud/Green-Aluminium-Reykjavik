import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {auth} from "../store/index";
import {Form, Button} from "react-bootstrap";
import {ClockPanel} from "./index";
import {Jumbotron, Row, Col} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import "./auth-form.css";
/**
 * COMPONENT
 */
const FrontPage = props => {
	const {name, displayName, handleSubmit, error} = props;

	return (
		<div id="authForm">
			<Jumbotron className="bg-white pl-5 pt-0 w-100" id="fpJumbo">
				<Row>
					<Col className="col-lg-6">
						<Row>
							<Col>
								<ul id="jumbotronList">
									<li className="fpLogo">SILVER PLATINUM </li>
									<li className="fpLogo">STOCKS</li>
									<li>Buy the stocks of your dreams</li>
								</ul>
							</Col>
						</Row>

						<Row>
							<Col className="ml-2 pl-5 pt-0">
								<Button variant="success" className="mr-1" id="openAccountButton">Open An Account</Button>
								<Button variant="outline-success" id="learnMoreButton">
									Learn More*  <i id="learnMoreArrow" className="fas fa-play"></i>
								</Button>
							</Col>
						</Row>
					</Col>

					<Col className="col-lg-6 my-auto">
						<ClockPanel id="clockPanel" />
					</Col>
				</Row>
			</Jumbotron>

			<Form id="entryForm"
				onSubmit={handleSubmit}
				name={name}
				className="mr-auto ml-auto mt-3 w-25 p-3"
			>
				{name === "signup" ? (
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
					</Form.Group>
				) : (
					<div></div>
				)}
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
						{name === "signup" ? (
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
						) : (
							<span></span>
						)}
					</Form.Text>
				</Form.Group>
				<Button variant="primary" type="submit">
					{displayName}
				</Button>{" "}
				<a href="/auth/google">
					<Button variant="primary">{displayName} with Google</Button>
				</a>
				{error && error.response && <div> {error.response.data} </div>}
			</Form>
		</div>
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
			let formInput = {
				email: evt.target.email.value,
				password: evt.target.password.value
			};

			if (formName === "signup")
				formInput = {
					...formInput,
					firstName: evt.target.firstName.value,
					lastName: evt.target.lastName.value
				};
			dispatch(auth(formInput, formName));
		}
	};
};

export const Login = connect(mapLogin, mapDispatch)(FrontPage);
export const Signup = connect(mapSignup, mapDispatch)(FrontPage);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.object
};
