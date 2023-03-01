const router = require('express').Router()
const userController = require('../controllers/user.controllers')
const authMiddleWare = require('../middleware/AuthMiddleware')


router.get("/:id",userController.getUser)
router.get("/",userController.getAllUser)
router.put("/:id",userController.updateUser)
router.delete("/:id",userController.deleteUser)
router.put("/:id/follow",userController.followUser)
router.put("/:id/unfollow",userController.UnFollowUser)



module.exports = router