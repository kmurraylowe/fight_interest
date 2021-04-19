const express = require('express')
const router = express.Router()
const fightController = require('../controllers/fightController')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, fightController.getFights)

router.post('/addFight', fightController.addFight)

router.put('/addOneFor', fightController.addOneFor)

router.put('/addOneAgainst', fightController.addOneAgainst)

router.delete('/deleteFight', fightController.deleteFight)

module.exports = router