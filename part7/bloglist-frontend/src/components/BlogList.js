import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <div key={blog.id}>
          <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => a.likes < b.likes)
  };
};

const connectedBlogList = connect(mapStateToProps)(BlogList);

export default connectedBlogList;
