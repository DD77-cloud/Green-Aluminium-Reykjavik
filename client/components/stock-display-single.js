import React from "react";
import "./stock-display-single.css";
import {Col, Card} from 'react-bootstrap'
/**
 * COMPONENT
 */
export default function SingleStock(props){
    console.log(props)
 return(
     <Col>
     <Card>
    <Card.Title>{props.stock.quote.symbol}</Card.Title>
    </Card>
    </Col>
    )   
}
