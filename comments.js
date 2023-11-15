// Create web server
// Created by: Chris Grimes
// Created on: 08/22/2019

// Load modules
const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Load local modules
const { Comment } = require('../models/comment');
const { Post } = require('../models/post');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const validateWith = require('../middleware/validation');

// Get all comments
router.get('/', async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
});

// Get a comment by id
router.get('/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  res.send(comment);
});

// Create a comment
router.post('/', [auth, validateWith(validateComment)], async (req, res) => {
  const post = await Post.findById(req.body.postId);
  if (!post) return res.status(400).send('Invalid post.');
  const comment = new Comment({
    text: req.body.text,
    user: {
      _id: req.user._id,
      name: req.user.name
    },
    post: {
      _id: post._id,
      title: post.title
    }
  });
  await comment.save();

  post.comments.push(comment);
  await post.save();

  res.send(comment);
});

// Update a comment
router.put('/:id', [auth, validateWith(validateComment)], async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  if (comment.user._id !== req.user._id) return res.status(403).send('Access denied.');

  comment.text = req.body.text;
  await comment.save();

  res.send(comment);
});

// Delete a comment
router.delete('/:id', auth, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  if (comment.user._id !== req.user._id) return res.status(403).send('Access