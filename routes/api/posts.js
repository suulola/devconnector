const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc Just to test
// @access Public
router.get("/test", (req, res) =>
  res.json({
    hello: "posts"
  })
);

// @route GET api/posts/
// @desc Get all posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No post found" }));
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route POST api/posts/
// @desc Create Post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar
    });
    newPost.save().then(post => res.json(post));
  }
);

// @route DELETE api/posts/:id
// @desc Delete Post
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //    Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id).then(post => {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ unauthorized: "User not authorized" });
      }
      // else delete the post
      post
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
    // });
  }
);

// @route POST api/posts/like/:id
// @desc Like post
// @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked the post" });

          // either the above or the below

          // or we can make it a single button like and unlike
          // const rmIndex = post.likes.map(item => item.id).indexOf(req.user.id);
          // post.likes.splice(rmIndex, 1);
          // post
          //   .save()
          //   .then(post => res.json(post))
          //   .catch(err => res.json({ error: "didn't delete" }));
          //  return;
        }
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route POST api/posts/unlike/:id
// @desc Unlike post
// @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          res
            .status(400)
            .json({ notliked: "You have not yet liked this post" });
        }
        const removeIndex = post.likes
          .map(item => item.id)
          .indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        // the below is a non-destructive method . .. lolz
        //post.likes = post.likes.filter(like => like.user.toString() !== req.user.id )
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route POST api/posts/comment/:id
// @desc Add comment
// @access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          user: req.user.id,
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar
        };
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopost: "Post not found" }));
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment
// @access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //check if the comment id matches a comment
        // does this mean other users can delete the comment of another user so far they are logged in
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: "Comment doesn't not exist" });
        }
        // delete the comment
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

module.exports = router;
