const router = require('express').Router()
const messageControllers = require('../controllers/message.controllers')



router.post('/', messageControllers.addMessage)

router.get('/:chatId', messageControllers.getMessages)


module.exports = router 