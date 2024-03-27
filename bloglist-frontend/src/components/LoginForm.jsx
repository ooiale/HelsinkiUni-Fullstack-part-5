import { useState } from 'react'
import PropTypes from 'prop-types'

const loginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
              username
          <input
            type='text'
            name='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
              password
          <input
            type='password'
            name='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit"> login </button>
      </form>
    </div>
  )
}

loginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default loginForm