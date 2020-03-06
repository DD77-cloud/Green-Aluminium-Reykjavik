const User = require('./user')
const Transaction = require('./transactions')
const Stocks = require('./Stocks')

User.belongsToMany(Stocks, {
  through: Transaction,
  as: 'users'
})

Stocks.belongsToMany(User, {
  through: Transaction,
  as: 'transactions',
})

module.exports = {
  Transaction,
  User,
  Stocks
}
