const router = require('express').Router()
module.exports = router

//logged out users have no access
//logged in users can only access their own information
//admins can access all the information
//to mask multiple user pages admin-accessed pages are specified with queries
//if query is sent by someone without admin rights it gets rejected

// const verifyLoggedIn = async (req, res, next) => {
//   if(!req.user || req.query.id && !req.user.admin){
//     return res.status(401).send('Insufficient Rights')
//   } else {
//     //either a query(if own profile) or the session user id(if checked by admin)
//     req.query.id ? res.locals.idValue = req.query.id : res.locals.idValue = req.user.id
//     next()
//   }
// // }
// router.use(verifyLoggedIn)
router.use('/users', require('./users'))
router.use('/transactions', require('./transactions'))
router.use('/stocks', require('./iexapi'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
