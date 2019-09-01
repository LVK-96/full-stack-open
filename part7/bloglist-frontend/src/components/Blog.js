import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { like, removeBlog, addComment } from '../reducers/blogsReducer';
import { useField } from '../hooks';

const Blog = ({ blog, user, like, removeBlog, addComment }) => {
  const newComment = useField('text');

  if (!blog)
    return null;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikeClick = (event) => {
    event.preventDefault();
    like(blog);
  };

  const handleRemoveClick = (event) => {
    event.preventDefault();
    window.confirm(`remove ${blog.name} by ${blog.author}`);
    removeBlog(blog);
  };

  const handleNewComment = (event) => {
    event.preventDefault();
    addComment(blog, newComment.value);
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
        <h2>Comments</h2>
        <ul>
          {blog.comments.map(comment =>
            <li key={uuidv4()}>{comment}</li> )}
        </ul>
      </div>
      <div>
        <form onSubmit={handleNewComment}>
    New comment:
          {' '}
          <input { ..._.omit(newComment, ['reset']) }/>
          <button type="submit">submit comment</button>
        </form>
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
  removeBlog,
  addComment
};


const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog);

export default connectedBlog;
