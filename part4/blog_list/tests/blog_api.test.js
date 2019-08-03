const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs');
  const body  = response.body;
  body.forEach(b => expect(b.id).toBeDefined());
});

test('post request creates new blog', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAfterPost = await helper.blogsInDb();
  expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1);
  
  const newBlogFromDb = blogsAfterPost.filter(blog => blog.title === 'Canonical string reduction')[0];
  expect(newBlogFromDb.title).toBe('Canonical string reduction');
  expect(newBlogFromDb.author).toBe('Edsger W. Dijkstra');
  expect(newBlogFromDb.url).toBe('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html');
  expect(newBlogFromDb.likes).toBe(12);
});

test('likes are initialised to 0 if missing from post request', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  const blogsAfterPost = await helper.blogsInDb();
  const newBlogFromDb = blogsAfterPost.filter(blog => blog.title === 'Canonical string reduction')[0];
  expect(newBlogFromDb.likes).toBe(0);
});

test('if title and url are missing respond with 400', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 1
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
});

afterAll(() => {
  mongoose.connection.close();
});
