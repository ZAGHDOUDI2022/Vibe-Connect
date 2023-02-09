const router = require('express').Router()
const userController = require('../controllers/user.controllers')
const authMiddleWare = require('../middleware/AuthMiddleware')

router.get("/:id",userController.getUser)
router.put("/:id",authMiddleWare,userController.updateUser)
router.delete("/:id",authMiddleWare,userController.deleteUser)
router.put("/:id/follow",authMiddleWare,userController.followUser)
router.put("/:id/unfollow",authMiddleWare,userController.UnFollowUser)



module.exports = router