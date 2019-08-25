import React from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useField } from '../hooks';
import _ from 'lodash';

const Login = ({ setUser, setNotificationMessage }) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value, 
        password: password.value,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user),
      );

      blogService.setToken(user.token);
      setUser(user);
      setNotificationMessage('Login succesfull');
      setTimeout(() => setNotificationMessage(null), 5000);
    } catch (e) {
      setNotificationMessage('login failed');
      setTimeout(() => setNotificationMessage(null), 5000);
    }
  };

  const username = useField('text');
  const password = useField('password');

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input { ..._.omit(username, ['reset']) }/>
        </div>
        <div>
          password
          <input { ..._.omit(password, ['reset']) }/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
