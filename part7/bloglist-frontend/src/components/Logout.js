import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../reducers/userReducer';

const Logout = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      Logged in as
      {' '}
      {user.name}
      <button onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  logout
};

const connectedLogout = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default connectedLogout;
