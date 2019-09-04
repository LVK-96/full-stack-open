describe('User not logged in', function () {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
    cy.clearLocalStorage();
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Log in to application');
  });

  it('user can login', function () {
    cy.get('#username')
      .type('test');
    cy.get('#password')
      .type('test');
    cy.contains('login')
      .click();
    cy.contains('Login succesfull');
  });
});

describe('User logged in no blogs in db', function () {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
    cy.clearLocalStorage();
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
    cy.get('#username')
      .type('test');
    cy.get('#password')
      .type('test');
    cy.contains('login')
      .click();
  });

  it('user can add blog', function() {
    cy.get('#togglable')
      .click();
    cy.get('#newBlogFormTitle')
      .type('test');
    cy.get('#newBlogFormAuthor')
      .type('test');
    cy.get('#newBlogFormUrl')
      .type('test');
    cy.get('#submitnewblog')
      .click();
    cy.get('td')
      .contains('test');
  });

  it('user can browse users list', function() {
    cy.get('#users')
      .click();
  });

  it('user can view user info', function() {
    cy.get('#users')
      .click();
    cy.get('li > a')
      .click();
  });

  it('user can logout', function() {
    cy.get('.ml-2')
      .click();
    cy.contains('Log in to application');
  });
});

describe('User logged in with blogs in db', function () {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
    cy.clearLocalStorage();
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
    cy.get('#username')
      .type('test');
    cy.get('#password')
      .type('test');
    cy.contains('login')
      .click();
    cy.get('#togglable')
      .click();
    cy.get('#newBlogFormTitle')
      .type('test');
    cy.get('#newBlogFormAuthor')
      .type('test');
    cy.get('#newBlogFormUrl')
      .type('test');
    cy.get('#submitnewblog')
      .click();
  });

  it('user can view blog info', function () {
    cy.visit('http://localhost:3000');
    cy.get('td > a')
      .click();
    cy.contains('added by test');
  });

  it('user can add comment to blog', function () {
    cy.visit('http://localhost:3000');
    cy.get('td > a')
      .click();
    cy.get('input')
      .type('test comment');
    cy.get('form > button')
      .click();
    cy.contains('test comment');
  });
});
