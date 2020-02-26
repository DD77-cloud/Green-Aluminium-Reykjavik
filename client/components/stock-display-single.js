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
        chartArea: {'width': '75%', 'height': '70%'}
      }
    const graphData =[
        ["Date", "Price"],
    ]
    props.stock.chart.forEach(entry => {
        graphData.push([entry.date, entry.open])
    })
    //End Graph Options
    const {symbol, change, companyName, marketCap, changePercent} = props.stock.quote
 return(
     <Col>
    
     <Card className="singleStockCard">
         
    <Card.Body>
    <Card.Title>{symbol}<span>{companyName}</span></Card.Title>
    
    {change}
    {changePercent}
    asds
    {marketCap}
    
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
