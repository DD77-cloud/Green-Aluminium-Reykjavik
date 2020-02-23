const router = require('express').Router()
const { User } = require('../db/models')

module.exports = router


router.get('/', async (req, res, next) => {
	try {
    const user = await User.findAll({
      where: {
        id: res.locals.idValue
      },
      attributes: [
        'id',
        'email',
        'address',
        'userName',
        'firstName',
        'lastName',
        'apt',
        'houseNumber',
        'street',
        'zipcode',
        'state',
        'country',
		'admin',
		'bankroll'
      ]
    })
		res.json(user)
	} catch (error) {
		next(error)
	}
})

router.get('/all', async (req, res, next) => {
	if(!req.user.admin) return res.status(401).end() //not in middleware because no queries are sent
	try {
      const users = await User.findAll({
				attributes: [
					'id',
					'email',
					'address',
					'userName',
					'firstName',
					'lastName'
        ]
      })
			res.json(users)
		} catch (error) {
		next(error)
	}
})

router.put('/', async (req, res, next) => {
	try {
			let user = await User.update(
					{
						email: req.body.email,
						password: req.body.password,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						apt: req.body.apt,
						street: req.body.street,
						houseNumber: req.body.houseNumber,
						zipcode: req.body.zipcode,
						state: req.body.state,
						country: req.body.country,
						admin: req.body.admin
					},
					{
						where: { id: res.locals.idValue },
						individualHooks: true//salts the updated password, etc
					}
				)
		res.json(user)
	} catch (error) {
		next(error)
	}
})

router.delete('/', async (req, res, next) => {
	try {
			const destroyed = await User.destroy({
				where: { id: res.locals.idValue }
			})
			res.json(destroyed)
	} catch (error) {
		next(error)
	}
})
