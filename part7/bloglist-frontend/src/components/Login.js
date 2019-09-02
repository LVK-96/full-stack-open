import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useField } from '../hooks';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';
import { login } from '../reducers/loginReducer';

const Login = ({ login, showNotificationWithTimeout }) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    login({
      username: username.value,
      password: password.value,
    });

    showNotificationWithTimeout('Login succesfull', 5);
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
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  login,
  showNotificationWithTimeout
};

const connectedLogin = connect(null, mapDispatchToProps)(Login);

export default connectedLogin;
