import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../store/index";
import {Navbar, Nav, NavItem, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./st-navbar.css";

function LoggedInNavbar({handleClick, isLoggedIn, clientName, bankroll}){
    return(
    <Navbar id="loggedInNavbar" bg="white" variant="light" expand="lg" className="flex-column">
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse className="basic-navbar-nav flex-column w-100">
            <Nav className="mr-auto flex-column w-100" >
                {/* The navbar will show these links after you log in */}
                    <div id="welcomeBack" className = "w-100">
                    <LinkContainer to="/profile" className="w-100 d-flex justify-content-around align-items-center"><Nav.Link >
                    <i class="far fa-user fa-2x"></i>
                        {clientName}</Nav.Link></LinkContainer>
                    </div>
                <LinkContainer 
                    to={{
                        pathname: "/portfolio",
                        query: {type: "portfolio"}
                    }}
                >
                    <Nav.Link className="loggedInNavbarLinks">My Stocks</Nav.Link>
                </LinkContainer>
                <LinkContainer 
                    to={{
                        pathname: "/buy",
                        query: {type: ""}
                    }}
                >
                    <Nav.Link className="loggedInNavbarLinks">Buy Stocks</Nav.Link>
                </LinkContainer>
                <LinkContainer 
                    to={{
                        pathname: "/transactions",
                        query: {type: "transactions"}
                    }}
                >
                    <Nav.Link className="loggedInNavbarLinks">Transactions</Nav.Link>
                </LinkContainer>
                <LinkContainer 
                    to={{
                        pathname: "/profile",
                        query: {type: ""}
                    }}
                >
                    <Nav.Link className="loggedInNavbarLinks">Settings</Nav.Link>
                </LinkContainer>
                <Nav.Link href="#" onClick={handleClick} className="loggedInNavbarLinks">
                    Logout
                </Nav.Link>
            </Nav>

           
        </Navbar.Collapse>
    </Navbar>

)
};

/**
 * CONTAINER
 */
const mapState = state => {
	return {
        isLoggedIn: !!state.userState.loggedInUser.id,
        clientName: `${state.userState.loggedInUser.firstName} ${state.userState.loggedInUser.lastName}`
	};
};

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout());
		}
	};
};

export default connect(mapState, mapDispatch)(LoggedInNavbar);

/**
 * PROP TYPES
 */
LoggedInNavbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
