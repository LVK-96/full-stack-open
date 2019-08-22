import React, { useState } from 'react';


const Blog = ({ blog }) => {
  const [extraBlogInfoVisible, setExtraBlogInfoVisible] = useState(false);
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: extraBlogInfoVisible ? '' : 'none'
  }

  return (
    <div>
      <div onClick={() => setExtraBlogInfoVisible(true)}>
        {blog.title}
        {' '}
        {blog.author}
      </div>
      <div style={blogStyle} onClick={() => setExtraBlogInfoVisible(false)}>
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
