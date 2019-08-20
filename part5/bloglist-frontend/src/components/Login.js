import React from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const Login = ({
  username, setUsername, password, setPassword, user, setUser, setNotificationMessage,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user),
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotificationMessage('Login succesfull');
      setTimeout(() => setNotificationMessage(null), 5000);
    } catch (e) {
      setNotificationMessage('login failed');
      setTimeout(() => setNotificationMessage(null), 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;