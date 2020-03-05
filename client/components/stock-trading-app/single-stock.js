import React from 'react'
import {Row, Col} from "react-bootstrap";
import './single-stock.css'

export default function SingleStock(props){
   return(
    
        <Row className="singleStockRow">
            <Col>{props.data}</Col>
            <Col></Col>
            <Col></Col>
        </Row>
    
    )
}

