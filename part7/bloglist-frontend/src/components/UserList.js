import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UserList = ({ users, blogs, id }) => {
  const padding = {
    paddingRight: 5
  };

  const numAdded = (user) => {
    return blogs.filter(blog => blog.user.id === user.id).length;
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user =>
          <li key={user.id}>
            <Link key={user.id} style={padding} to={`users/${user.id}`}>
              {user.name}
            </Link> {' '} has added {numAdded(user)} {' '} blogs
          </li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  };
};

const connectedUserList = connect(mapStateToProps)(UserList);

export default connectedUserList;
