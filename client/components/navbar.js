import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../store/index";
import {Navbar, Nav, NavItem, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Login} from './index';
import "./navbar.css";
import "./auth-form.css";
function OurNavbar({handleClick, isLoggedIn, clientName, bankroll}){
  const [displayLogin, setDisplayLogin] = React.useState({height:0, width: 0, overflow: 'hidden'})
  console.log(displayLogin, setDisplayLogin)
  return(
	<div>
		{isLoggedIn ? (
			<Navbar bg="white" variant="light" expand="lg">
				<LinkContainer
					to={{pathname: "/portfolio", query: {type: "portfolio"}}}
				>
					<Navbar.Brand>Silver Platinum Stocks</Navbar.Brand>
				</LinkContainer>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						{/* The navbar will show these links after you log in */}

						<LinkContainer
							to={{
								pathname: "/portfolio",
								query: {type: "portfolio"}
							}}
						>
							<Nav.Link>Portfolio</Nav.Link>
						</LinkContainer>
						<LinkContainer
							to={{
								pathname: "/transactions",
								query: {type: "transactions"}
							}}
						>
							<Nav.Link>Transactions</Nav.Link>
						</LinkContainer>
						<Nav.Link href="#" onClick={handleClick}>
							Logout
						</Nav.Link>
					</Nav>

					<Nav className="ml-auto h-100">
						<Navbar.Text className="pr-2 mr-1">
							Signed in as:
							<Nav.Link href="/profile">{clientName}</Nav.Link>
						</Navbar.Text>

						<NavItem className="text-success p-3 pt-4">
							Balance: {(bankroll / 100).toFixed(2)}
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		) : (
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
					<Navbar.Brand href="/home">
						<img
							id="navBarLogoSignedOut"
							src="https://cdn.pixabay.com/photo/2014/12/21/23/57/silver-576442_960_720.png"
						/>
						Silver Platinum Stocks
					</Navbar.Brand>

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
            <div style={displayLogin}>
          <Login />
          </div>
							<LinkContainer to="/login">
              <Button variant="outline-success" onClick={()=>{setDisplayLogin({height:50, width: 100, overflow: 'hidden'})}}className="rounded-0 mr-1 navBarAuthButtons" >Login</Button>
							</LinkContainer>
							<LinkContainer to="/signup">
              <Button variant="success" className="rounded-0 navBarAuthButtons">Open Account</Button>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
         
				</Navbar>
			</div>
		)}
  </div>
  )
};

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.userState.loggedInUser.id,
		clientName: `${state.userState.loggedInUser.firstName} ${state.userState.loggedInUser.lastName}`,
		bankroll: state.userState.loggedInUser.bankroll
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
