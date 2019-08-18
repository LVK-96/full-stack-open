import React from 'react';

const Logout = ({ user }) => {
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser');
    window.location.reload();
  };

  return (
    <div>
      Logged in as
      {' '}
      {user.name}
      <button onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Logout;
