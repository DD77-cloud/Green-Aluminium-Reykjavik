import React from "react";
import {Button} from "react-bootstrap";
import {FrontPageStocks, ClockPanel} from "./index";
import {Jumbotron, Row, Col, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

import "./front-page.css";
/**
 * COMPONENT
 */
export default function FrontPage (props){
	return (
		<div>
        <div id="frontPageWrapper">
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
            <FrontPageStocks />

			</div>
						<Navbar variant="light" expand="lg" id="footer">
						<Nav>
							<LinkContainer to="/">
								<Nav.Link className="">For Invididuals*</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/">
								<Nav.Link className="">For Institutions*</Nav.Link>
							</LinkContainer>
			   
						</Nav>
			  <Nav className="ml-auto" id="footerRightSide">
				
				<LinkContainer to="/">
								<Nav.Link className=""><i className="far fa-question-circle"></i> About Us*</Nav.Link>
							</LinkContainer>
				<LinkContainer to="/">
								<Nav.Link className=""><i className="far fa-envelope"></i> Contact Us*</Nav.Link>
							</LinkContainer>
			  </Nav>
					</Navbar>
				</div>
	);
};

