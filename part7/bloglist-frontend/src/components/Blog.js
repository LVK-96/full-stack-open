import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, like, removeBlog }) => {
  return (
    <div>
      <div className='basicInfo'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        {' '}
        {blog.author}
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
    user: state.loggedUser
  };
};


const connectedBlog = connect(mapStateToProps)(Blog);

export default connectedBlog;
