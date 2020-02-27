import React from "react";
import {Container, Row, Col, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import "./footer.css";
export default function Footer (props){
	return (
        <Navbar expand="lg" id="footer">
            <Nav id="footerNav">
                <Container fluid={true}>
                    <Row>
                        <Col className="col-lg-3">
                        <ul>
                        <li>About Us</li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Overview*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Newsroom*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Careers*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Privacy*</Nav.Link>
                        </LinkContainer>
                        </li>
                        </ul>
                        </Col>
                        <Col className="col-lg-3">
                        <ul>
                        <li>Service</li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Contact Us*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">FAQ*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Consultants*</Nav.Link>
                        </LinkContainer>
                        </li>
                        </ul>
                        </Col>
                        <Col className="col-lg-3">
                        <ul>
                        <li>Education</li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">For Educators*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Stock Academy*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Glossary*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Webinars*</Nav.Link>
                        </LinkContainer>
                        </li>
                        </ul>
                        </Col>
                        <Col className="col-lg-3">
                        <ul>
                        <li>Pricing</li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Acc Minimums*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Comission*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Financing*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink">Other Fees*</Nav.Link>
                        </LinkContainer>
                        </li>
                        </ul>
                        </Col>
                    </Row>
                </Container>
            </Nav>
            <Nav id="ContactUs" className="col-lg-3">
                     <ul >
                        <li>Connect With Us</li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink"><i className="fas fa-phone-volume"></i> 800-555-5555*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/">
                                <Nav.Link className="footerlink"><i className="fas fa-map-marker-alt"></i> Find a Branch*</Nav.Link>
                        </LinkContainer>
                        </li>
                        <li id="socialMedia"><i className="fab fa-twitter-square"></i>
                        <i className="fab fa-facebook-square"></i>
                        <i className="fab fa-linkedin"></i>
                        <i className="fab fa-instagram-square"></i>
                       <i className="fab fa-youtube-square"></i></li>
                     </ul>
                </Nav>
        </Navbar>
    );
};

