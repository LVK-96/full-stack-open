const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs.map(blog => blog.toJSON()));
  } catch (e) {
    next(e);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const users = await User.find({});
  const user = users[0];
  const { body } = request;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (e) {
    next(e);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;
  if (!body.likes) {
    return response.status(400).json({
      error: 'likes missing',
    });
  }

  const blog = {
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog.toJSON());
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
