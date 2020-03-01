import React from "react";
import "./stock-display-single.css";
import {Col, Card} from 'react-bootstrap'
import { Chart } from "react-google-charts";
/**
 * COMPONENT
 */
export default function SingleStock(props){
    //Start Graph Options
    const graphOptions = {
        curveType: "function",
        legend: { position: "none" },
        hAxis: { textPosition: 'none' },
        chartArea: {'width': '75%', 'height': '70%'},
        colors: ['green']
      }
    const graphData =[
        ["Date", "Price"],
    ]
    props.stock.chart.forEach(entry => {
        graphData.push([entry.date, entry.open])
    })
    //End Graph Options
    let {symbol, change, companyName, marketCap, changePercent} = props.stock.quote
    let gainLoss
    change>0 ? gainLoss="green" : gainLoss="red"
 return(
     <Col className="fpSingleStockCol">
    
     <Card className="singleStockCard">
         
    <Card.Body>
    <Card.Title><span className="singleStockCardSymbol">{symbol}</span><span className="singleStockCardCompanyName">{companyName}</span></Card.Title>
    <ul style={{color:`${gainLoss}`}}>
    <li>{change}({(changePercent*100).toFixed(2)}%) TODAY</li>
    <li style={{color:'lightslategray'}}>Market Cap: {(marketCap/1000000000).toFixed(2)}B</li>
    </ul>
    
    
    <Chart
          chartType="LineChart"
          data={graphData}
          options={graphOptions}
        />
        </Card.Body>
    </Card>
    </Col>
    )   
}
