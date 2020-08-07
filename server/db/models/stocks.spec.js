
const {expect} = require('chai')
const db = require('../index')
const Stocks = db.model('stocks')
const Sequelize = require("sequelize");

describe('stocksModelTests', ()=>{
    let cody
    beforeEach(() => {
        return db.sync({force: true})
    })
    it('Works', async()=>{
        let createdStock
        try{
            createdStock = await Stocks.create({
                ticker: "TSLA",
            })
        }catch(err){
            console.error(err)
        }
        expect(createdStock.ticker).to.be.equal("TSLA")
    })
    it('Does not allow price history to be set on create', async()=>{
        let createdStock
        try{
            createdStock = await Stocks.create({
                ticker: "TSLA",
                priceHistory:  JSON.stringify({
                    "date": "2020-02-05",
                    "open": 338.4,
                    "close": 329.34,
                    "high": 333.92,
                    "low": 330.21,
                    "volume": 30787708,
                    "uOpen": 327.53,
                    "uClose": 329.33,
                    "uHigh": 329.92,
                    "uLow": 321.48,
                    "uVolume": 30493715,
                    "change": 0,
                    "changePercent": 0,
                    "label": "Feb 5",
                    "changeOverTime": 0
                  })
            })
        }catch(err){
            console.error(err)
        }
        expect(createdStock).to.be.equal(undefined)
    })
    it('Updates the stock price history without overwriting old data', async()=>{
        let createdStock
        const priceData = JSON.stringify({
            "date": "2020-03-03",
            "open": 318.17,
            "close": 296.57,
            "high": 311,
            "low": 288.6,
            "volume": 83508358,
            "uOpen": 315.66,
            "uClose": 301.96,
            "uHigh": 313,
            "uLow": 296.2,
            "uVolume": 82571277,
            "change": -9.61,
            "changePercent": -3.3208,
            "label": "Mar 3",
            "changeOverTime": -0.101925
          })
          const priceDataTwo = JSON.stringify({
            "date": "2020-03-03",
            "open": 319.17,
            "close": 296.57,
            "high": 311,
            "low": 288.6,
            "volume": 83508358,
            "uOpen": 315.66,
            "uClose": 301.96,
            "uHigh": 313,
            "uLow": 296.2,
            "uVolume": 82571277,
            "change": -9.61,
            "changePercent": -3.3208,
            "label": "Mar 3",
            "changeOverTime": -0.101925
          })
        try{
            createdStock = await Stocks.create({
                ticker: "TSLA",
            })
        }catch(err){
            console.error(err)
        }
        const updatedStock = await Stocks.update({'priceHistory': Sequelize.fn('array_append', Sequelize.col('priceHistory'), priceData)},
        {'where': {'ticker':"TSLA"},
        'returning': true})
        expect(updatedStock[1][0].priceHistory.length).to.be.equal(1)
        expect(updatedStock[1][0].priceHistory[0].open).to.be.equal(318.17)
        const updatedStockTwo = await Stocks.update({'priceHistory': Sequelize.fn('array_append', Sequelize.col('priceHistory'), priceDataTwo)},
        {'where': {'ticker':"TSLA"},
        'returning': true})
        expect(updatedStockTwo[1][0].priceHistory[0].open).to.be.equal(318.17)
        expect(updatedStockTwo[1][0].priceHistory.length).to.be.equal(2)
        expect(updatedStockTwo[1][0].priceHistory[1].open).to.be.equal(319.17)
    })
})