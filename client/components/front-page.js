import React from "react";
import {Button} from "react-bootstrap";
import {FrontPageStocks, Footer, FPJumbotron} from "./index";
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
		<FPJumbotron/>
		<FrontPageStocks />
			</div>
			
				</div>
	);
};

