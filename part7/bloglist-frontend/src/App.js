import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import blogService from './services/blogs';
import BlogList from './components/BlogList';
import Login from './components/Login';
import Logout from './components/Logout';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { initializeBlogs } from './reducers/blogsReducer';
import { setUser } from './reducers/userReducer';

const App = ({ initializeBlogs, user, setUser }) => {
  const [addBlogVisible, setAddBlogVisible] = useState(false);

  useEffect(() => {
    initializeBlogs();
  }, [initializeBlogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const userFromStorage = JSON.parse(loggedUserJSON);
      setUser(userFromStorage);
      blogService.setToken(userFromStorage.token);
    }
  }, [setUser]);

  if (!user) {
    return (
      <div className='Login'>
        <Notification />
        <Login />
      </div>
    );
  }

  return (
    <div className='blogList'>
      <Notification />
      <Logout />
      <Togglable buttonLabel="add blog">
        <NewBlog
          addBlogVisible={addBlogVisible}
          setAddBlogVisible={setAddBlogVisible}
        />
      </Togglable>
      <BlogList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  initializeBlogs,
  setUser
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
