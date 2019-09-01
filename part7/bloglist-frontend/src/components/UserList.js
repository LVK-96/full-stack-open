import React from 'react';
import { connect } from 'react-redux';
import User from './User';

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      {users.map(user =>
        <User key={user.id} user={user} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const connectedUserList = connect(mapStateToProps)(UserList);

export default connectedUserList;
