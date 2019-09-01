import blogService from '../services/blogs';

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    });
  };
};

export const addComment = (blog, comment) => {
  return async dispatch => {
    const commented = await blogService.addComment(blog, comment);
    dispatch({
      type: 'ADD_COMMENT',
      data: commented
    });
  };
};

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog);
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    });
  };
};

export const like = (blog) => {
  return async dispatch => {
    const toBeLiked = { ...blog, likes: blog.likes + 1 };
    const likedBlog = await blogService.update(toBeLiked);
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE_BLOG':
    return state.map(blog =>
      blog.id === action.data.id ? action.data: blog
    );

  case 'NEW_BLOG':
    return state.concat(action.data);

  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id);

  case 'INIT_BLOGS':
    return action.data;

  case 'ADD_COMMENT':
    return state.map(blog =>
      blog.id === action.data.id ? action.data: blog
    );

  default:
    return state;
  }
};

export default blogReducer;
