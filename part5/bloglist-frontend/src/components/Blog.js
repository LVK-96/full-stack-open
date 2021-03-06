import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({
  blog, blogs, setBlogs, user,
}) => {
  const [extraBlogInfoVisible, setExtraBlogInfoVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

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
    const likedBlog = { ...blog, likes: likes + 1 };
    blogService.update(blog.id, likedBlog);
    setLikes(likedBlog.likes);
    setBlogs(blogs.filter((blog) => blog.id !== likedBlog.id).concat(likedBlog));
  };

  const handleRemoveClick = (event) => {
    event.preventDefault();
    const removedBlog = blog;
    window.confirm(`remove ${blog.name} by ${blog.author}`);
    blogService.remove(blog.id);
    setBlogs(blogs.filter((blog) => blog.id !== removedBlog.id));
  };

  return (
    <div>
      <div className='basicInfo' onClick={() => setExtraBlogInfoVisible(!extraBlogInfoVisible)}>
        {blog.title}
        {' '}
        {blog.author}
      </div>
      <div className='extraInfo' style={blogStyle}>
        <div className='likes'>
          {likes} {' '} likes
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
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
