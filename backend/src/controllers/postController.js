const posts = require('../models/postModel');

const addPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await posts.create({
            title,
            content
        })

        await post.save()

        res.status(201).json({
            message: "Post created successfully",
            data: post
        })

    } catch (error) {
        console.log("error in addPost", error.message);
        res.status(500).json({ message: error.message })
    }
}

const getPosts = async (req, res) => {
    try {
        const postsList = await posts.find()

        if(!postsList) {
            return res.status(404).json({ message: "No posts found" })
        }

        res.status(200).json({
            message: "Posts fetched successfully",
            data: postsList
        })
    } catch (error) {
        console.log("error in getPosts", error.message);
        res.status(500).json({ message: error.message })
    }
}

const getPost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await posts.findById(id)

        if(!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        res.status(200).json({
            message: "Post fetched successfully",
            data: post
        })
    } catch (error) {
        console.log("error in getPost", error.message);
        res.status(500).json({ message: error.message })
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body
    try {
        const post = await posts.findByIdAndUpdate(id, {
            title,
            content
        }, { new: true })

        if(!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        res.status(200).json({
            message: "Post updated successfully",
            data: post
        })
    } catch (error) {
        console.log("error in updatePost", error.message);
        res.status(500).json({ message: error.message })
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await posts.findByIdAndDelete(id)

        if(!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        res.status(200).json({
            message: "Post deleted successfully",
            data: post
        })
    } catch (error) {
        console.log("error in deletePost", error.message);
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    addPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
}