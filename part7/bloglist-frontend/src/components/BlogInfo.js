import React from 'react';
import { connect } from 'react-redux';
import { like, removeBlog } from '../reducers/blogsReducer';

const BlogInfo = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blog)
    return null;

  const handleLikeClick = (event) => {
    event.preventDefault();
    like(blog);
  };

  const handleRemoveClick = (event) => {
    event.preventDefault();
    window.confirm(`remove ${blog.name} by ${blog.author}`);
    removeBlog(blog);
  };
  const removeVisible = { display: blog.user.id === user.id ? '' : 'none' };
  return (
    <div style={blogStyle}>
      <h2>
        {blog.title}
        {' '} by {' '}
        {blog.author}
      </h2>
      <div className='likes'>
        {blog.likes} {' '} likes
        <button className='likeButton' onClick={handleLikeClick}>
          like
        </button>
      </div>
      <div className='addedBy'>
        added by
        {' '}
        {blog.user.name}
      </div>
      <div className='removeButton'>
        <button onClick={handleRemoveClick} style={removeVisible}>
            remove
        </button>
      </div>
      <div>
        <ul>
          {blog.comments.map(comment =>
            <li key={blog.id}>{comment}</li> )}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  };
};

const mapDispatchToProps = {
  like,
  removeBlog
};

const connectedBlogInfo = connect(mapStateToProps, mapDispatchToProps)(BlogInfo);

export default connectedBlogInfo;

