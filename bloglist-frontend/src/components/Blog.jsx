import { useState } from 'react'

const Blog = ({ blog, likeBlog, username, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }


  const info = showAll
    ? <div className='BlogAll'>
      <p>title: {blog.title} <button onClick={toggleShowAll} className='toggleShowAll'> hide </button></p>
      <p>author: {blog.author}</p>
      <p>link: {blog.url}</p>
      <p>likes: {blog.likes} <button onClick={likeBlog}> like </button></p>
      <p>created by: {blog.user.username}</p>
      {username === blog.user.username
        ? <button onClick={deleteBlog}> delete </button>
        : ''}
    </div>
    : <div className='BlogShort'>
      <p>{blog.title} <button onClick={toggleShowAll} className='toggleShowAll'> view </button></p>
    </div>


  return(
    <div style={blogStyle} className='blog'>
      {info}
    </div>
  )
}

export default Blog