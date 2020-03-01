import React from 'react'
import {Card} from 'react-bootstrap'
import './clockwidget.css'

export default function ClockWidget(props){
    const repDegHour = props.handAngles[0]+360
    const repDegMin = props.handAngles[1]+360
    const repDegSec = props.handAngles[2]+360
    
    document.styleSheets[2].insertRule('@keyframes hours { to {transform:rotate('+repDegHour+'deg)}}')
    document.styleSheets[2].insertRule('@keyframes minutes { to {transform:rotate('+repDegMin+'deg)}}')
    document.styleSheets[2].insertRule('@keyframes seconds { to {transform:rotate('+repDegSec+'deg)}}')
    
    //the clocks rotate using css transition(i.e. 12 hours = transition that takes 42300 seconds)
    //after establishing the original clock hand positions and using them as the start point to transform
    //we then establish the final point of transform by adding 360 to the start(full rotation)
    //the actual time only updates once on creation
    return(
    <Card.Body className="clockWidgetCardBody" className="p-0">
        <div id="watch" style={{fontSize:`${props.size}em`}}>
            <div className="frame-face"></div>
            <ul className="minute-marks">
                <li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li><li></li><li></li>
            </ul>
            
            <ul className="digits">
                <li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li>
                <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>
            </ul>
            <div className="hours-hand" style={{transform:`rotate(${props.handAngles[0]}deg)`}}></div>
            <div className="minutes-hand" style={{transform:`rotate(${props.handAngles[1]}deg)`}}></div>
            <div className="seconds-hand" style={{transform:`rotate(${props.handAngles[2]}deg)`}}></div>
            
        </div>
        <Card.Text className="text-center clockCityName">{props.city}</Card.Text>
    </Card.Body>
    )
    
}
