import React from 'react';
import blogService from '../services/blogs';
import { useField } from '../hooks';
import _ from 'lodash';

const NewBlog = ({ blogs, setBlogs, setNotificationMessage, setAddBlogVisible }) => {
  const addBlog = async (event) => {
    try {
      event.preventDefault();
      const newBlog = {
        title: newBlogName.value,
        author: newBlogAuthor.value,
        url: newBlogUrl.value,
      };

      await blogService.create(newBlog);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
      setNotificationMessage(`${newBlog.title} added`);
      setTimeout(() => setNotificationMessage(null), 5000);
      setAddBlogVisible(false);
      newBlogName.reset();
      newBlogAuthor.reset();
      newBlogUrl.reset();
    } catch (e) {
      setNotificationMessage(e.message);
      setTimeout(() => setNotificationMessage(null), 5000);
    }
  };
  
  const newBlogName = useField('text');
  const newBlogAuthor = useField('text');
  const newBlogUrl = useField('text');

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
      name:
          {' '}
          <input { ..._.omit(newBlogName, ['reset']) }/>
        </div>
        <div>
      author:
          {' '}
          <input { ..._.omit(newBlogAuthor, ['reset']) }/>
        </div>
        <div>
      url:
          {' '}
          <input { ..._.omit(newBlogUrl, ['reset']) }/>
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
