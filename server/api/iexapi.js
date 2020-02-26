const router = require('express').Router()
module.exports = router
const axios = require('axios')

router.get('/', async (req, res, next) => {
    try {
        const stocks = await axios.get(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${req.query.tickers}&types=quote,chart&token=${process.env.IEX_API_TOKEN}`)
        res.send(stocks.data)
    } catch (error) {
        next(error)
    }
})