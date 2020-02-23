const router = require('express').Router()
const {User, Transaction} = require('../db/models')
module.exports = router



router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
        where:{
            userId: res.locals.idValue
        }
    })
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})

router.get('/all', async (req, res, next) => {
    if(!req.user.admin) return res.status(401).end() //not in middleware because no queries are sent
    try {
      const transactions = await Transaction.findAll()
      res.json(transactions)
    } catch (err) {
      next(err)
    }
  })

router.post('/', async (req, res, next) => {
    try {
      if(req.query.id && req.user.admin) return res.status(401).send('Admins cant add transactions to other users') //since this method does not use queryid at all we prevent admins from accidently deducting from their own accounts
      let transactionSum = 0;
      req.body.order.forEach(stock => transactionSum+=(stock.priceAtTransaction*Number(stock.quantity)))
      const user = await User.findByPk(req.user.id)
      if(user.bankroll<parseInt(transactionSum*100))  return res.status(406).send('Insufficient Funds')
      
      const completed = await Promise.all(req.body.order.map(async (stock) =>{
        let quantityIn= Number(stock.quantity)
          await Transaction.create({
          ticker: stock.ticker,
          priceAtTransaction: stock.priceAtTransaction,
          quantity: quantityIn,
          userId: req.user.id
        })
      }))
      let addToBankroll = parseInt(transactionSum*100)
      user.bankroll-=addToBankroll
      await user.save()
    let transactions
    if(completed){
      transactions = await Transaction.findAll({
        where:{
            userId: req.user.id
        }
    })}
    
    res.status(201).send(transactions)
    } catch (err) {
      next(err)
    }
  })



