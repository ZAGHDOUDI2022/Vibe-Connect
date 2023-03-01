const PostModel = require('../models/post.modal')
const UserModel = require('../models/user.modal')
const mongoose = require('mongoose')
const multer = require("multer");








// Creat new Post
// Add the `upload.single("image")` middleware to handle file uploads
module.exports.createPost =  async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};





 


  
  

  // Update a post
  module.exports.updatePost = async (req, res) => {
      const postId = req.params.id;
      const { userId } = req.body;
    
      try {
        const post = await PostModel.findById(postId);
        if (post.userId === userId) {
          await post.updateOne({ $set: req.body });
          res.status(200).json("Post Updated");
        } else {
          res.status(403).json("Action forbidden");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    };

  // Delete a post
module.exports.deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(id);
      if (post.userId === userId) {
        await post.deleteOne();
        res.status(200).json("Post deleted successfully");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // like/dislike a post
module.exports.likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(id);
      if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      } else {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post Unliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Get Timeline POsts
module.exports.getTimelinePosts = async (req, res) => {
  const userId = req.params.id
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      { 
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add a comment to a post
module.exports.commentPost = async (req, res) => {
  const postId = req.params.id;
  const { commenterId, commenterPseudo, text } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("Post not found");

    const newComment = {
      commenterId,
      commenterPseudo,
      text,
      timestamp: new Date().getTime(),
    };

    await post.updateOne({ $push: { comments: newComment } });
    res.status(200).json("Comment added");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Edit a comment of a post
module.exports.editCommentPost = async (req, res) => {
  const postId = req.params.id;
  const { commentId, text } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("Post not found");

    const theComment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );
    if (!theComment) return res.status(404).send("Comment not found");

    theComment.text = text;

    await post.save();
    res.status(200).json("Comment updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a comment of a post
module.exports.deleteCommentPost = async (req, res) => {
  const postId = req.params.id;
  const { commentId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("Post not found");

    await post.updateOne({ $pull: { comments: { _id: commentId } } });
    res.status(200).json("Comment deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};