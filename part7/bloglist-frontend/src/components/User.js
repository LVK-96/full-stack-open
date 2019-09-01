import React from 'react';
import { connect } from 'react-redux';

const User = ({ user, blogs }) => {
  const numAdded = blogs.filter(blog => blog.user.id === user.id).length; 
  return (
    <div>
      {user.name} {' '} added {numAdded} {' '} blogs
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const connectedUser = connect(mapStateToProps)(User);

export default connectedUser;
