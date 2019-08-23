import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement, cleanup } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  afterEach(cleanup);
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    );

    await waitForElement(
      () => component.getByText('login')
    ); 

    const blogList = component.container.querySelector('.blogList');
    const Login = component.container.querySelector('.Login');
    expect(blogList).not.toBeInTheDocument();
    expect(Login).toBeInTheDocument();
  });

  test('when user is logged, blogs are rendered', async () => {
    const user = {
      username: 'username1',
      token: '1',
      name: 'name1',
      id: '1'
    };

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    const component = render(
      <App />
    );
    
    await waitForElement(
      () => component.container.querySelector('.blogList')
    ); 

    const blogList = component.container.querySelector('.blogList');
    const Login = component.container.querySelector('.Login');
    expect(blogList).toBeInTheDocument();
    expect(Login).not.toBeInTheDocument();
  });
});
