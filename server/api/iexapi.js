const router = require('express').Router()
module.exports = router
const axios = require('axios')
let symbolList = [["1", "2", "3"], []] //since stock symbols are only updated once a day we don't need to keep making calls, and since the call to symbol api is free we have no incentive to keep it in a DB so they are stored for the duration of server-life
router.get('/', async (req, res, next) => {
    try {
        const stocks = await axios.get(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${req.query.tickers}&types=quote,chart&token=${process.env.IEX_API_TOKEN}`)
        res.send(stocks.data)
    } catch (error) {
        next(error)
    }
})
router.get('/symbols', async (req, res, next) =>{
    try {
        let currentTime = new Date().toLocaleString("en-GB", {timeZone: "America/New_York", hour: '2-digit', minute: '2-digit', weekday: "short", day: "numeric", year: "numeric", month: "numeric"}).split(/[:| ]/)
        let hasValues = symbolList[1].length //checks that we have symbol values stored
        let isCurrent = symbolList[0][1]===currentTime[1]//checks that the values have been updated today. I am not sure whether it gets updated on weekends.
        let isUpdated = symbolList[0][2]==="7" && symbolList[0][3]>"45" || symbolList[0][2]>"7" //the stock ticker list updates at 7:45am. 
        let notUpdatable = currentTime[2]==="7" && currentTime[3]<"45" || currentTime[2]<"7"
        let updatedYesterday =  currentTime[1].split(/[\/]/)-1===symbolList[0][1].split(/[\/]/)//if the time is past market close we need to check that the last update is no older than yesterday
        if(hasValues && isCurrent && isUpdated || hasValues && updatedYesterday && !notUpdatable) res.send(symbolList[1]) 
        else{
            const {data} = await axios.get(`https://sandbox.iexapis.com/stable/ref-data/iex/symbols?token=${process.env.IEX_API_TOKEN}`)
            let symbols = data
            .filter(stock => stock.isEnabled)
            .map(stock => stock.symbol)
            .sort()
            symbolList[0]=currentTime
            symbolList[1]=symbols
            res.send(symbols)
        }
    } catch (error) {
        next(error)
    }
})