const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('when there are some initial blogs in the db', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs');
    const { body } = response;
    body.forEach(b => expect(b.id).toBeDefined());
  });
});

describe('adding new blog', () => {
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
      likes: 1,
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
});

describe('deleting blogs', () => {
  test('valid delete existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const toBeDeleted = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .expect(204);

    expect(await helper.blogsInDb()).not.toContainEqual(toBeDeleted);
  });

  test('delete non existing blog returns 400', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const toBeDeleted = blogsAtStart[0];

    await api
      .delete('/api/blogs/notvalid')
      .expect(400);
  });
});

describe('updating existing blogs', () => {
  test('valid update existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const toBeUpdated = blogsAtStart[0];

    const newValues = {
      likes: 404,
    };

    await api
      .put(`/api/blogs/${toBeUpdated.id}`)
      .send(newValues)
      .expect(200);

    const blogsAfterUpdate = await helper.blogsInDb();
    const updated = blogsAfterUpdate.filter(blog => blog.id === toBeUpdated.id)[0];
    expect(updated).toBeDefined;
    expect(updated.title).toBe(toBeUpdated.title);
    expect(updated.author).toBe(toBeUpdated.author);
    expect(updated.url).toBe(toBeUpdated.url);
    expect(updated.likes).toBe(404);
  });

  test('update without new no. of likes returns 400', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const toBeUpdated = blogsAtStart[0];

    await api
      .put(`/api/blogs/${toBeUpdated.id}`)
      .send()
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
