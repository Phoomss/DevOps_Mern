import http from './http-common'

const createPost = async (post) => {
    return await http.post('/post/add', post)
}

const getAllPosts = async () => {
    return await http.get('/post/get')
}

const getPostById = async (id) => {
    return await http.get(`/post/get/${id}`)
}

const updatePost = async (id, post) => {
    return await http.put(`/post/update/${id}`, post)
}

const deletePost = async (id) => {
    return await http.delete(`/post/delete/${id}`)
}

const postService = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}

export default postService  