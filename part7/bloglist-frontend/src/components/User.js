import React from 'react';
import { connect } from 'react-redux';

const User = ({ user, blogs }) => {
  if (user === undefined) {
    return null
  }

  const numAdded = blogs.length;
  return (
    <div>
      {user.name} {' '} has added {numAdded} {' '} blogs
      <ul>
        {blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.user)
    return {
      blogs: null
    }
  
  return {
    blogs: state.blogs.filter(blog => blog.user.id === ownProps.user.id)
  }
}

const connectedUser = connect(mapStateToProps)(User);

export default connectedUser;
