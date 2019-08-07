const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const helper = require('./user_helper');
const User = require('../models/user');

describe('initial users in the db', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('adding new users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root', password: 'sekret' });
    await user.save();
  });

  test('valid creating new user', async () => {
    const initialUsers = await helper.usersInDb();
    const newUser = {
      username: 'dasd',
      name: 'asdd',
      password: 'enkerro:D',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAfterPost = await helper.usersInDb();
    expect(usersAfterPost.length).toBe(initialUsers.length + 1);

    const newUserFromDb = usersAfterPost.filter(user => user.username === 'dasd')[0];
    expect(newUserFromDb.username).toBe('dasd');
    expect(newUserFromDb.name).toBe('asdd');
  });

  test('missing username creating new user', async () => {
    const initialUsers = await helper.usersInDb();
    const newUser = {
      name: 'asdd',
      password: 'enkerro:D',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('too short username creating new user', async () => {
    const initialUsers = await helper.usersInDb();
    const newUser = {
      username: 'da',
      name: 'asdd',
      password: 'enkerro:D',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('non unique username creating new user', async () => {
    const initialUsers = await helper.usersInDb();
    const newUser = {
      username: 'root',
      name: 'asdd',
      password: 'enkerro:D',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('missing password creating new user', async () => {
    const initialUsers = await helper.usersInDb();
    const newUser = {
      username: '321321321',
      name: 'asdd',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('too short password creating new user', async () => {
    const initialUsers = await helper.usersInDb();
    const newUser = {
      username: 'dsadsadsad',
      name: 'asdd',
      password: 'en',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
