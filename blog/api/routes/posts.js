const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const auth = require("./authfuncs");

// app.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });

// Create Post
router.post("/", auth, async (req, res)=>{
    const post = new Post(req.body)
    // const subreddit = new Subreddit(req.body.subreddit)
    try{
        const savedPost = post.save();
        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json(err);
    }
});

// get posts

router.get("/", auth, async (req, res) => {
    const username = req.query.user;
    const catName = req.query.subreddit;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          subreddits: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE POST
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // UPDATING POSTS
  router.put("/:id", auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
         
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.put("/comment/:id", auth, async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.author === req.body.author) {
         
        try {
          const updated = await Comment.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updated);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your comments");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// upvoting and downvoting
router.put("/vote/:id", auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (req.body.upvotes) {
        post.upvotes += req.body.upvotes;
        try {
        await post.save();
        }
      catch(err) {
         return res.status(200).json();
     }
    }
    if (req.body.downvotes) {
        post.downvotes += req.body.upvotes;
        try {
          await post.save();
          }
        catch(err) {
           return res.status(200).json();
       }
    }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put("/comment/:id", auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = new Comment(req.body);
      comment.postId = req.params.id;
        post.comments.push(comment);
        
        try {
        await comment.save();
        await post.save();
        return res.status(200).json(post);
        }
        
      catch(err) {
         return res.status(500).json(err);
     }
    
    
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/reply/:id", auth, async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      const reply = new Comment(req.body);
      reply.postId = req.params.id;
        comment.replies.push(reply);
        
        try {
        await comment.save();
        await reply.save();
        return res.status(200).json(comment);
        }
        
      catch(err) {
         return res.status(500).json(err);
     }
    
    
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;