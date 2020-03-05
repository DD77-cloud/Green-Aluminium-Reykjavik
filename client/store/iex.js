import axios from 'axios'
import history from '../history'
import {me} from './user'
require("../../secrets");
/**
 * ACTION TYPES
 */
const GET_ALL_SYMBOLS = "GET_ALL_SYMBOLS"
/**
 * INITIAL STATE
 */

 const initialIEXState ={
    symbols: [],
 }
/**
 * ACTION CREATORS
 */
const getAllSymbols = symbolList => ({type: GET_ALL_SYMBOLS, symbolList})
/**
 * THUNK CREATORS
 */

 export const getSymbolsThunk = () => async dispatch => {
     try {
         const {data} = await axios.get('/api/stocks/symbols')
         dispatch(getAllSymbols(data))
     } catch (error) {
         console.error(error)
     }
 }
/**
 * REDUCER
 */

 export default function(state=initialIEXState, action){
     switch(action.type){
        case GET_ALL_SYMBOLS:
             return {...state, symbols:action.symbolList}
        default:
            return state
     }
 }
