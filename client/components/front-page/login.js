import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {auth} from "../../store/index";
import {Form, Button, Card} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import "./login.css";

const Login = props => {
	const {name, displayName, handleSubmit, error} = props;

	return (
        <Card className="mx-auto w-25 p-3 mt-5" id="loginCard">
            <Card.Title className="mr-auto ml-auto mt-3"><i className="far fa-user-circle fa-5x"></i></Card.Title>
            <Card.Body>
			<Form id="logIn"
				onSubmit={handleSubmit}
				name={name}
				className="mb-3"
			>
				<Form.Group controlId="email">
					<Form.Label className="loginLabel">Email:</Form.Label>
					<Form.Control type="email" placeholder="Enter your email" />
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label className="loginLabel">Password:</Form.Label>
					<Form.Control type="password" placeholder="Password" />
					<Form.Text className="text-light">
					</Form.Text>
				</Form.Group>
				<Button variant="success" type="submit" className="mt-2">
					{displayName}
				</Button>{" "}
				<a href="/auth/google">
					<Button variant="success" className="mt-2">{displayName} with Google</Button>
				</a>
				{error && error.response && <div> {error.response.data} </div>}
			</Form>
            
                <ul className="list-inline d-flex justify-content-between" id="logInHelpUL">
                    <li className="logInHelpLinks list-inline-item"><LinkContainer to="/"><a>Forgot User ID or Password?*</a></LinkContainer></li>
                    <li className="logInHelpLinks list-inline-item"><LinkContainer to="/"><a>Don't Have An Account?*</a></LinkContainer></li>
                </ul>
           
               
            </Card.Body>
        </Card>
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

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();

			const formName = evt.target.name;
			const formInput = {
				email: evt.target.email.value,
				password: evt.target.password.value
			};
			dispatch(auth(formInput, formName));
		}
	};
};

export default connect(mapLogin, mapDispatch)(Login);

/**
 * PROP TYPES
 */
Login.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.object
};
