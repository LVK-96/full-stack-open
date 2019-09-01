import loginService from '../services/login';
import blogService from '../services/blogs';

export const login = (user) => {
  return async dispatch => {
    const loggedUser = await loginService.login(user);
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(loggedUser),
    );
    dispatch({
      type: 'LOGIN',
      data: loggedUser
    });
  };
};

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser');
  window.location.reload();
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const setUser = (user) => {
  blogService.setToken(user.token);
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    });
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data;

  case 'LOGOUT':
    return null;

  case 'SET_USER':
    return action.data;

  default:
    return state;
  }
};

export default userReducer;

