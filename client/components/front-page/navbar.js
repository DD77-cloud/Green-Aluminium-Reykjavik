import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../store/index";
import {Navbar, Nav, NavItem, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./navbar.css";

function OurNavbar({handleClick, isLoggedIn}){
  return(
	<div>
				<Navbar bg="dark" expand="lg" id="tinyTopNavBar">
					<Nav>
						<LinkContainer to="/">
							<Nav.Link className="fi">For Invididuals*</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/">
							<Nav.Link className="fi">For Institutions*</Nav.Link>
						</LinkContainer>
           
					</Nav>
          <Nav className="ml-auto" id="tinyNavBarRightSide">
            
            <LinkContainer to="/">
							<Nav.Link className="fi"><i className="far fa-question-circle"></i> About Us*</Nav.Link>
						</LinkContainer>
            <LinkContainer to="/">
							<Nav.Link className="fi"><i className="far fa-envelope"></i> Contact Us*</Nav.Link>
						</LinkContainer>
          </Nav>
				</Navbar>
				<Navbar
					bg="white"
					variant="light"
					expand="lg"
					id="navBarLoggedOut"
				>
					<LinkContainer to="/home"><Navbar.Brand>
						<img
							id="navBarLogoSignedOut"
							src="https://cdn.pixabay.com/photo/2014/12/21/23/57/silver-576442_960_720.png"
						/>
						Silver Platinum Stocks
					</Navbar.Brand></LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{/* The navbar will show these links before you log in */}
            <Nav id="navBarInformation">
            <LinkContainer to="/">
							<Nav.Link className="navBarInformationLinks">New to Investing?*</Nav.Link>
						</LinkContainer>
            <LinkContainer to="/">
							<Nav.Link className="navBarInformationLinks">Investment Choices*</Nav.Link>
						</LinkContainer>
            <LinkContainer to="/">
							<Nav.Link className="navBarInformationLinks">Account Types*&nbsp;</Nav.Link>
						</LinkContainer>
            <LinkContainer to="/">
							<Nav.Link className="navBarInformationLinks">Pricing*&nbsp;&nbsp;</Nav.Link>
						</LinkContainer>
            </Nav>
						<Nav className="ml-auto h-100 navBarAuthButtonsNav">
            
							<LinkContainer to='/login'>
              <Button variant="outline-success" className="rounded-0 mr-1 navBarAuthButtons">Login</Button>
							</LinkContainer>
							<LinkContainer to="/signup">
              <Button variant="success" className="rounded-0 navBarAuthButtons">Open Account</Button>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
         
				</Navbar>
			</div>
  )
};

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.userState.loggedInUser.id
	};
};

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout());
		}
	};
};

export default connect(mapState, mapDispatch)(OurNavbar);

/**
 * PROP TYPES
 */
OurNavbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
