const router = require('express').Router()
const postController = require('../controllers/post.controllers')
const PostModel = require('../models/post.modal')


router.post("/create",postController.createPost)
router.get("/",postController.getPost)
router.put("/:id",postController.updatePost)
router.delete("/:id",postController.deletePost)
router.put("/:id/like",postController.likePost)
router.get("/:id/timeline",postController.getTimelinePosts)
router.post('/:id/comment', postController.commentPost);
router.put('/:id/comment', postController.editCommentPost);
router.delete('/:id/comment', postController.deleteCommentPost);

router.get('/:id/likes', async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      const likes = post.likes;
      res.status(200).json(likes);
    } catch (error) {
      res.status(500).json(error);
    }
  });

 

module.exports = router