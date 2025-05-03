const express = require('express');
const postRouter = express.Router();
const { addPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/postController');

postRouter.post('/add', addPost);
postRouter.get('/get', getPosts);
postRouter.get('/get/:id', getPost);
postRouter.delete('/delete/:id', deletePost);
postRouter.put('/update/:id', updatePost);

module.exports = postRouter;