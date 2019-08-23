import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

afterEach(cleanup);

test('only name and author rendered by default', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 1,
    user: {
      name: 'name',
      username: 'username',
      id: '123',
    }
  };

  const user = {
    name: 'name',
    username: 'username',
    id: '123'
  };

  const component = render(
    <Blog  blog={blog} blogs={[blog]} setBlogs={jest.fn()} user={user} />
  );

  const basicInfo = component.container.querySelector('.basicInfo');
  expect(basicInfo).toHaveTextContent(
    'title author'
  );
});

test('extra info rendered after click on basic info', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 1,
    user: {
      name: 'name',
      username: 'username',
      id: '123',
    }
  };

  const user = {
    name: 'name',
    username: 'username',
    id: '123'
  };

  const component = render(
    <Blog  blog={blog} blogs={[blog]} setBlogs={jest.fn()} user={user} />
  );

  const basicInfo = component.container.querySelector('.basicInfo');
  expect(basicInfo).toHaveTextContent(
    'title author'
  );
  
  basicInfo.click();
  const likes = component.container.querySelector('.likes');
  const likeButton = component.container.querySelector('.likeButton');
  const addedBy = component.container.querySelector('.addedBy');
  const removeButton = component.container.querySelector('.removeButton');
  expect(likes).toHaveTextContent(
    '1 likes'
  );
  
  expect(likeButton).toHaveTextContent(
    'like'
  );
  
  expect(addedBy).toHaveTextContent(
    'name'
  );

  expect(removeButton).toHaveTextContent(
    'remove'
  );
});
