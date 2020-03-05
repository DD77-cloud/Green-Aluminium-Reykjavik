import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleStock from './single-stock'
import { getUserTransThunk, iexUpdateThunk } from '../../store/transactions'
import { getSymbolsThunk } from '../../store/iex'
import {Container} from "react-bootstrap";
import {Table, Form, Button} from 'react-bootstrap'
import { SingleTrans, BuyStock} from '../index.js'
import './stock-list.css'
class StockListAndSearch extends Component{
    constructor(){
        super()
        this.state = {
            allTransactions: [],//could be user specific or all all
            portfolio: [],
            initialLossGain: this.updateStockMarketInitial(),
            foundTicker: "",
            suggestedTickers: []
        }
    }
    findSuggestedSymbols = (event) => {
        if(event.target.value.length<=0) return 0;
        let toMatch = RegExp(`^${event.target.value}`, 'i')
        let suggestions = this.props.allTheSymbols.filter(symbol => toMatch.test(symbol))
        this.setState({suggestedTickers: suggestions})
    }
    updateStockMarket = () =>{
        this.interval = setInterval(() =>{
            if(this.props) this.props.getStockUpdate(this.props.portfolio)
        }, 50000)
    }
    updateStockMarketInitial = () =>{
        let invoked = 0
        return function(portIn, funcIn) { 
            if(!invoked) funcIn(portIn)
            invoked = 1;
        }
    }
    findTicker = (event) =>{
        event.preventDefault()
        let tickerToFind = event.target.elements[0].value.toUpperCase()
        let newPortfolioObject = {...this.props.portfolio}
        newPortfolioObject[tickerToFind] = {priceAtTransaction: 0, oldprice: 0}
        this.setState({foundTicker: tickerToFind.toString()})
        this.props.getStockUpdate(newPortfolioObject)
    }
    componentDidMount(){
        this.props.findUserTrans()
        this.props.getAllSymbols()
        clearInterval(this.interval)
        if(this.props.location && this.props.location.query && this.props.location.query.type==="portfolio" || this.props.location && this.props.location.pathname==="/portfolio") {
            this.updateStockMarket()
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    render(){
        let totalPortfolio = 0
        let transactionToPass = Object.values(this.props.portfolio)
        if(!this.props.isMarketOpen) clearInterval(this.interval)
        if(Object.keys(this.props.portfolio).length){
            this.state.initialLossGain(this.props.portfolio, this.props.getStockUpdate)
            transactionToPass.forEach(stock => totalPortfolio=totalPortfolio+(stock.priceAtTransaction*stock.quantity))
        }
        let isPortfolio = true//because our default unprompted view will be portfolio we start with it
        if(this.props.location && this.props.location.query && this.props.location.query.type==="transactions"){
            totalPortfolio = null;
            transactionToPass = this.props.allTransactions;
            isPortfolio = false;
        }
        return(
            <div id = "stockListDiv">
            <Form id="findStockForm" inline onSubmit={() => this.findTicker(event)}>
            <Form.Group controlId = "tickerToFind" className = "w-100 h-100">
             <Form.Control onChange = {this.findSuggestedSymbols} type="text" placeholder="&#128269; Search by stock symbol or ticker" className="h-100 rounded-0 border-0 w-100" name="tickerToFind"/>
             </Form.Group>
            </Form>
            <div id="stockList">
            {this.state.suggestedTickers.map((stock, idx) => {
               return(
                <Container key={stock+idx}>
                    <SingleStock data={stock}/>
                </Container>
               )
            })}
             </div>
            </div>
        )
    }
}
const mapState = (state) =>{
       return {
           allTransactions: state.transState.transactions, 
           portfolio: state.transState.portfolio,
           isMarketOpen: state.transState.isMarketOpen,
           balance: state.userState.loggedInUser.bankroll,
           allTheSymbols: state.iexState.symbols
       }
}

const mapDispatch = dispatch => {
    return {
        findUserTrans(){
            dispatch(getUserTransThunk())
        },
        getStockUpdate(portfolioIn){
            dispatch(iexUpdateThunk(portfolioIn))
        },
        getAllSymbols(){
            dispatch(getSymbolsThunk())
        }
    }
}

export default connect(mapState, mapDispatch)(StockListAndSearch)
