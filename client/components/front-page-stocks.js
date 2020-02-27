import React, { Component } from 'react'
import {connect} from "react-redux";
import {iexUpdateThunk } from '../store/transactions'
import {SingleStock} from './index'
import PropTypes from "prop-types";
import {auth} from "../store/index";
import {Container, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import "./front-page-stocks.css";
/**
 * COMPONENT
 */
class FrontPageStocks extends Component{
    
    componentDidMount(){
        this.props.getStockUpdate({TSLA:0, AMZN:1, MSFT:2,})
    }
    
    
render(){
    
 return(
     
         <Container id="fpStocksContainer" fluid={true}>
             <Row id="fpStocksRow" className="justify-content-around">
        {Object.entries(this.props.portfolio).map(([key, value])=>(
            <SingleStock key={key} stock={value}/>
        ))}
        </Row>
        </Container>
   
    ) 
 }
}
const mapState = (state) =>{
    return { 
        portfolio: state.transState.portfolio,
    }
}

const mapDispatch = dispatch => {
 return {
     getStockUpdate(portfolioIn){
         dispatch(iexUpdateThunk(portfolioIn))
     }
 }
}

export default connect(mapState, mapDispatch)(FrontPageStocks)