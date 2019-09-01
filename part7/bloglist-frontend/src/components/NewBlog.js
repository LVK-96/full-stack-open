import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useField } from '../hooks';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogsReducer';

const NewBlog = ({ createBlog, showNotificationWithTimeout, setAddBlogVisible }) => {
  const addBlog = async (event) => {
    try {
      event.preventDefault();
      const newBlog = {
        title: newBlogName.value,
        author: newBlogAuthor.value,
        url: newBlogUrl.value,
      };

      createBlog(newBlog);
      showNotificationWithTimeout(`${newBlog.title} added`, 5);
      setAddBlogVisible(false);
      newBlogName.reset();
      newBlogAuthor.reset();
      newBlogUrl.reset();
    } catch (e) {
      showNotificationWithTimeout(e.message, 5);
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

const mapDispatchToProps = {
  showNotificationWithTimeout,
  createBlog
};

const connectedNewBlog = connect(null, mapDispatchToProps)(NewBlog);

export default connectedNewBlog;
