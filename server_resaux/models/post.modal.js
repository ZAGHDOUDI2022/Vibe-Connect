const mongoose = require('mongoose');


    const postSchema = new mongoose.Schema(
      {
        userId: { type: String, required: true },
        desc: {type: String, required : true},
        likes: [],
        createdAt: {
          type: Date,
          default: new Date(),
        },
        image:{type: String},
      },
      {
        timestamps: true,
      }
    );
// play function before save into display: 'block',




const PostModel  = mongoose.model("post", postSchema);

module.exports = PostModel;