import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { like, removeBlog } from '../reducers/blogsReducer';

const Blog = ({ blog, user, like, removeBlog }) => {
  const [extraBlogInfoVisible, setExtraBlogInfoVisible] = useState(false);
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: extraBlogInfoVisible ? '' : 'none',
  };

  const removeVisible = { display: blog.user.id === user.id ? '' : 'none' };

  const handleLikeClick = (event) => {
    event.preventDefault();
    like(blog);
  };

  const handleRemoveClick = (event) => {
    event.preventDefault();
    window.confirm(`remove ${blog.name} by ${blog.author}`);
    removeBlog(blog);
  };

  return (
    <div>
      <div className='basicInfo' onClick={() => 
        setExtraBlogInfoVisible(!extraBlogInfoVisible)}>
        {blog.title}
        {' '}
        {blog.author}
      </div>
      <div className='extraInfo' style={blogStyle}>
        <div className='likes'>
          {blog.likes} {' '} likes
          <div className='likeButton'>
            <button onClick={handleLikeClick}>
              like
            </button>
          </div>
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
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  like,
  removeBlog
}

const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog);

export default connectedBlog;
