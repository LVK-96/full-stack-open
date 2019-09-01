const jwt = require('jsonwebtoken');
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

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    response.json(blog.toJSON());
  } catch (e) {
    next(e);
  }
});

blogsRouter.get('/:id/comments', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    response.json(blog.comments);
  } catch (e) {
    next(e);
  }
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { body } = request;
  try {
    const blog = await Blog.findById(request.params.id);
    console.log(blog);
    const commentedBlog = {
      comments: blog.comments.concat(body.text),
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, commentedBlog, { new: true });
    response.json(updatedBlog.toJSON());
  } catch (e) {
    next(e);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const { body } = request;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'permission denied' });
    }

    await blog.delete();
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
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .populate('user', { username: 1, name: 1 });
    response.json(updatedBlog.toJSON());
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
