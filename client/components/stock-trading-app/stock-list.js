import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserTransThunk, iexUpdateThunk } from '../../store/transactions'
import { getSymbolsThunk } from '../../store/iex'
import {Table, Form, Button} from 'react-bootstrap'
import { SingleTrans, BuyStock} from '../index.js'
import './stock-list.css'
class TransactionPortfolio extends Component{
    constructor(){
        super()
        this.state = {
            allTransactions: [],//could be user specific or all all
            portfolio: [],
            initialLossGain: this.updateStockMarketInitial(),
            foundTicker: ""
        }
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
            <div id = "stockList">
            <Form id="findStockForm" inline onSubmit={() => this.findTicker(event)}>
            <Form.Group controlId = "tickerToFind" className = "w-100 h-100">
             <Form.Control type="text" placeholder="&#128269; Search by stock symbol or ticker" className="h-100 rounded-0 border-0 w-100" name="tickerToFind"/>
             </Form.Group>
            </Form>
            {this.state.foundTicker.length && this.props.portfolio[this.state.foundTicker] ? (
                 <BuyStock trans={this.props.portfolio[this.state.foundTicker]} isPortfolio = {true} isPurchase= {true} balance={this.props.balance}/> 
                ) :( null)
            }
         
                    {transactionToPass.length && transactionToPass.map((transaction, idx) => {
                        if(!transaction.dateOfTransaction) return
                        let key = Date.parse(transaction.dateOfTransaction)*idx
                        return(
                            <SingleTrans key={key} trans = {transaction} isPortfolio = {isPortfolio} />
                        )
                    })}
             
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

export default connect(mapState, mapDispatch)(TransactionPortfolio)
