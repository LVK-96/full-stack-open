import React from 'react';
import { connect } from 'react-redux';
import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { 
    blogs: state.blogs.sort((a, b) => a.likes < b.likes)
  }
}

const connectedBlogList = connect(mapStateToProps)(BlogList);

export default connectedBlogList;
