import React, { useEffect, useState } from 'react'
import postService from './services/postService'

const App = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [post, setPost] = useState({ title: '', content: '' })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await postService.getAllPosts()
        setPosts(res.data.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!post.title || !post.content) return

    try {
      if (editId) {
        const res = await postService.updatePost(editId, post)
        setPosts((prev) =>
          prev.map((p) => (p.id === editId ? res.data.data : p))
        )
        setEditId(null)
      } else {
        const res = await postService.createPost(post)
        setPosts((prev) => [...prev, res.data.data])
      }
      setPost({ title: '', content: '' })
    } catch (err) {
      setError(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await postService.deletePost(id)
      setPosts((prev) => prev.filter((p) => p.id !== id))

    } catch (err) {
      setError(err)
    }
  }

  const handleEdit = (p) => {
    setPost({ title: p.title, content: p.content })
    setEditId(p.id)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message || 'Unknown error'}</div>

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button type="submit">{editId ? 'Update' : 'Create'} Post</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setPost({ title: '', content: '' })
              setEditId(null)
            }}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((p) => (
          <div key={p.id} style={{ marginBottom: '20px' }}>
            <h2>{p.title}</h2>
            <p>{p.content}</p>
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p._id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default App
