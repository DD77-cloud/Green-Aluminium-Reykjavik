import React from "react";
import {Button} from "react-bootstrap";
import {ClockPanel} from "./index";
import {Jumbotron, Row, Col} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Signup} from './index';
import "./front-page.css";
/**
 * COMPONENT
 */
export default function FrontPage (props){
    const [signUpShow, setSignUpShow] = React.useState(false);
	return (
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
								<Button variant="success" onClick={() => setSignUpShow(true)} className="mr-1" id="openAccountButton">Open An Account</Button>
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
                <Signup show={signUpShow} onHide={()=>setSignUpShow(false)}/>
               
			</Jumbotron>
            
            </div>
	);
};

