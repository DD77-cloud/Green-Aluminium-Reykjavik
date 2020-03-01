import React from "react";
import {FrontPageStocks, FPJumbotron} from "../index";


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

