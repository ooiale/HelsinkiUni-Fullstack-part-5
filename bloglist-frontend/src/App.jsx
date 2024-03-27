import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [color, setColor] = useState('green')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchData()
  }, [blogs])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('savedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const likeBlog = async(id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const response = await blogService.update(updatedBlog)
    setBlogs(blogs.map(b => b.id === updatedBlog.id
      ? updatedBlog
      : b))
  }

  const displayBlogList = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog = {() => likeBlog(blog.id)}
            username = {user.username}
            deleteBlog = {() => deleteBlog(blog.id)}
          />
        )}
      </div>
    )
  }


  const displayLoginForm = () => {
    return (
      <>
        <h2>log in to application</h2>
        <Toggleable buttonLabel = {'log-in'}>
          <LoginForm
            username = {username}
            password = {password}
            setUsername = {setUsername}
            setPassword = {setPassword}
            handleLogin = {handleLogin}
          />
        </Toggleable>
      </>

    )
  }

  const displayBlogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p> {user.name} logged in
          <button onClick={handleLogout}> logout </button>
        </p>
        <Toggleable buttonLabel={'new blog'}>
          <BlogForm
            addBlog = {addBlog}
          />
        </Toggleable>
      </div>
    )
  }

  const displayNotification = (message) => {
    setTimeout( () => {
      setNotification('')
      setColor('green')
    }, 3000)
    return (
      <Notification
        message = {message}
        color = {color}
      />
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({ username, password })
      setUser(user)
      window.localStorage.setItem('savedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setNotification(`Successfully logged in on ${user.name}`)
    } catch (error) {
      setColor('red')
      setNotification('Wrong login or password')
    }
  }

  const handleLogout = () => {
    setNotification('Successfully logged out')
    window.localStorage.removeItem('savedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogToAdd) => {
    try {
      const response = await blogService.create(blogToAdd)
      setBlogs(blogs.concat(response))
      setNotification(`A new blog ${response.title} by ${response.author} added`)
    } catch (error) {
      console.log('ERROR CREATING THE BLOG', error)
    }
  }

  const deleteBlog = async (id) => {
    blogService.deleteBlog(id)
    setBlogs(blogs.filter(b => b.id !== id))
  }

  return (
    <div>
      {notification && displayNotification(notification, color)}
      {user === null
        ? displayLoginForm()
        : <div>
          {displayBlogForm()}
          {displayBlogList()}
        </div>
      }

    </div>
  )
}

export default App