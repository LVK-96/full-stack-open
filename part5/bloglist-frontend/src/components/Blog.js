import React from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog, extraBlogInfoVisible, setExtraBlogInfoVisible }) => {
  const showWhenVisible = { display: extraBlogInfoVisible ? '' : 'none' };

  return (
    <div>
      <div onClick={() => setExtraBlogInfoVisible(true)}>
        {blog.title}
        {' '}
        {blog.author}
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.likes} likes
        </div> 
        <div>
          added by
        </div> 
      </div>
    </div>
  );
}

export default Blog;
