import React from 'react';
import blogService from '../services/blogs';

const NewBlog = ({
  newBlogName, setNewBlogName, newBlogAuthor,
  setNewBlogAuthor, newBlogUrl, setNewBlogUrl,
  blogs, setBlogs, setNotificationMessage,
}) => {
  const addBlog = async (event) => {
    try {
      event.preventDefault();
      const newBlog = {
        title: newBlogName,
        author: newBlogAuthor,
        url: newBlogUrl,
      };

      await blogService.create(newBlog);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
      setNotificationMessage(`${newBlog.title} added`);
      setTimeout(() => setNotificationMessage(null), 5000);
    } catch (e) {
      setNotificationMessage(e.message);
      setTimeout(() => setNotificationMessage(null), 5000);
    }
  };

  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
      name:
          {' '}
          <input
            value={newBlogName}
            onChange={({ target }) => setNewBlogName(target.value)}
          />
        </div>
        <div>
      author:
          {' '}
          <input
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
      url:
          {' '}
          <input
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
