const router = require('express').Router()
const chatControllers = require('../controllers/chat.controllers')

router.post('/', chatControllers.createChat);
router.get('/:userId', chatControllers.userChats);
router.get('/find/:firstId/:secondId', chatControllers.findChat);
    



module.exports = router