import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
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
      <Button className='ml-2' onClick={handleLogout}>
        logout
      </Button>
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
