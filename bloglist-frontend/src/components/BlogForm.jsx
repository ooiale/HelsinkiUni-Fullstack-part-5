import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    const blogToCreate = {
      title,
      author,
      url
    }
    addBlog(blogToCreate)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2> create new </h2>
      <form onSubmit={createBlog}>
        <div>
                    title <input
            type='text'
            name='title'
            value={title}
            placeholder='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    author <input
            type='text'
            name='author'
            value={author}
            placeholder='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    url <input
            type='text'
            name='url'
            value={url}
            placeholder='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'> create </button>
      </form>
    </div>
  )
}

export default BlogForm