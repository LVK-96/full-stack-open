import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BlogList from './components/BlogList';
import BlogInfo from './components/BlogInfo';
import UserList from './components/UserList';
import User from './components/User';
import Menu from './components/Menu';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';
import { setUser } from './reducers/loginReducer';


const App = ({ initializeBlogs, initializeUsers,  
               user, setUser, users, blogs }) => {
  const [addBlogVisible, setAddBlogVisible] = useState(false);

  useEffect(() => {
    initializeBlogs();
  }, [initializeBlogs]);
  
  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const userFromStorage = JSON.parse(loggedUserJSON);
      setUser(userFromStorage);
    }
  }, [setUser]);
  
  const userById = (id) => {
    return users.find(user => user.id === id)
  }
  
  const blogById = (id) => {
    return blogs.find(blog => blog.id === id)
  }

  if (!user) {
    return (
      <div className='Login'>
        <Notification />
        <Login />
      </div>
    );
  }

  return (
    <Router>
      <div className='blogList'>
        <Notification />
        <Menu />
        <Route exact path='/' render={() => 
          <div>
            <Togglable buttonLabel="add blog">
              <NewBlog
                addBlogVisible={addBlogVisible}
                setAddBlogVisible={setAddBlogVisible}
              />
            </Togglable>
            <BlogList />
          </div>} />
          <Route exact path='/users' render={() => 
            <div>
              <UserList />
            </div>} />
          <Route path='/users/:id' render={({ match }) => 
            <div>
              <User user={userById(match.params.id)}/>
            </div>} />
          <Route path='/blogs/:id' render={({ match }) => 
            <div>
              <BlogInfo blog={blogById(match.params.id)}/>
            </div>} />
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser,
    users: state.users,
    blogs: state.blogs
  };
};

const mapDispatchToProps = {
  initializeBlogs,
  setUser,
  initializeUsers
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
