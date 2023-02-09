const router = require('express').Router()
const postController = require('../controllers/post.controllers')


router.post("/",postController.createPost)
router.get("/:id",postController.getPost)
router.put("/:id",postController.updatePost)
router.delete("/:id",postController.deletePost)
router.put("/:id/like",postController.likePost)
router.get("/:id/timeline",postController.getTimelinePosts)

module.exports = router