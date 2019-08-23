import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import Login from './components/Login';
import Logout from './components/Logout';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlogName, setNewBlogName] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [addBlogVisible, setAddBlogVisible] = useState(false);

  useEffect(() => {
    async function getBlogs() {
      try {
        const initialBlogs = await blogService.getAll();
        setBlogs(initialBlogs);
      } catch (e) {
        setNotificationMessage(e.message);
        setTimeout(() => setNotificationMessage(null), 5000);
      }
    }

    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (user === null) {
    return (
      <div className='Login'>
        <Notification message={notificationMessage} />
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          user={user}
          setUser={setUser}
          setNotificationMessage={setNotificationMessage}
        />
      </div>
    );
  }

  return (
    <div className='blogList'>
      <Notification message={notificationMessage} />
      <Logout user={user} />
      <Togglable buttonLabel="add blog">
        <NewBlog
          newBlogName={newBlogName}
          setNewBlogName={setNewBlogName}
          newBlogAuthor={newBlogAuthor}
          setNewBlogAuthor={setNewBlogAuthor}
          newBlogUrl={newBlogUrl}
          setNewBlogUrl={setNewBlogUrl}
          blogs={blogs}
          setBlogs={setBlogs}
          setNotificationMessage={setNotificationMessage}
          addBlogVisible={addBlogVisible}
          setAddBlogVisible={setAddBlogVisible}
        />
      </Togglable>
      <h2>blogs</h2>
      {blogs.sort((a, b) => a.likes < b.likes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
