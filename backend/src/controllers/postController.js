const posts = require('../models/postModel');

// Create
const addPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await posts.create({ title, content });
    res.status(201).json({
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    console.error('Error in addPost:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Read All
const getPosts = async (req, res) => {
  try {
    const postsList = await posts.find();
    res.status(200).json({
      message: 'Posts fetched successfully',
      data: postsList,
    });
  } catch (error) {
    console.error('Error in getPosts:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Read One
const getPost = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({
      message: 'Post fetched successfully',
      data: post,
    });
  } catch (error) {
    console.error('Error in getPost:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update
const updatePost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await posts.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    console.error('Error in updatePost:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete
const deletePost = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }
  
    try {
      const post = await posts.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({
        message: 'Post deleted successfully',
        data: post,
      });
    } catch (error) {
      console.error('Error in deletePost:', error.message);
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};