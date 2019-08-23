import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

test('renders content', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 1,
  }

  const component = render(
    <SimpleBlog  blog={blog} />
  );
  
  const title_name = component.container.querySelector('.titlename');
  const likes = component.container.querySelector('.likes');
  
  expect(title_name).toHaveTextContent(
    'title author'
  );

  expect(likes).toHaveTextContent(
    'blog has 1 likeslike'
  );
});

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 1,
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(2);
});
