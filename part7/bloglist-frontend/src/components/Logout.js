import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../reducers/loginReducer';

const Logout = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      Logged in as
      {' '}
      {user.name}
      <button onClick={handleLogout}>
        logout
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  };
};

const mapDispatchToProps = {
  logout
};

const connectedLogout = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default connectedLogout;
