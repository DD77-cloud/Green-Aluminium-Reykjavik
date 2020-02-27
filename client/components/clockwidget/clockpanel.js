import React from 'react'
import ClockWidget from './clockwidget'
import {Card, CardGroup} from 'react-bootstrap'
import './clockpanel.css'
//Start timezones
const NYTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York", hour: '2-digit', minute: '2-digit', second: '2-digit'})
const LDNTime = new Date().toLocaleString("en-US", {timeZone: "Europe/London", hour: '2-digit', minute: '2-digit', second: '2-digit'})
const MSKTime = new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow", hour: '2-digit', minute: '2-digit', second: '2-digit'})
const HKTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Hong_Kong", hour: '2-digit', minute: '2-digit', second: '2-digit'})
const TKYTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Tokyo", hour: '2-digit', minute: '2-digit', second: '2-digit'})
const timeZoneArray = [[HKTime, 'Hong Kong', 0.28], [TKYTime, 'Tokyo', 0.30], [NYTime, 'New York', 0.32], [LDNTime, 'London', 0.30], [MSKTime, 'Moscow', 0.28]]
//End timezones
    //the clocks rotate using css transition(i.e. 12 hours = transition that takes 42300 seconds
    //after establishing the original clock hand positions and using them as the start point to transform
    //we then establish the final point of transform by adding 360 to the start(full rotation)
    //the actual time only updates once on creation


export default function ClockPanel(props){
    return(
        <CardGroup id="clockPanel">
        {timeZoneArray.map(timeZone => {
            return(
                <Card key = {timeZone[1]} className = "clockWidgetCard d-flex flex-row border-0">
                <ClockWidget handAngles = {convertTimeToDegrees(timeZone[0])} city = {timeZone[1]} size={timeZone[2]}/>
                </Card>
            )
        })}
        
        </CardGroup>
    )
}

function convertTimeToDegrees(timeIn){
    const timeArr = timeIn.split(/[:| ]/)
    const hoursIn = +timeArr[0]
    const minutesIn = +timeArr[1]
    const secondsIn = +timeArr[2]
    const hourAngle = (0.5*(60*hoursIn+minutesIn))
    const minuteAngle = (6*minutesIn)
    const secondsAngle = (6*secondsIn)
    return [hourAngle, minuteAngle, secondsAngle]
}