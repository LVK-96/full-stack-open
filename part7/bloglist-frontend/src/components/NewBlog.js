import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useField } from '../hooks';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogsReducer';

const NewBlog = ({ createBlog, showNotificationWithTimeout, setAddBlogVisible }) => {
  const addBlog = async (event) => {
    try {
      event.preventDefault();
      const newBlog = {
        title: newBlogTitle.value,
        author: newBlogAuthor.value,
        url: newBlogUrl.value,
      };

      createBlog(newBlog);
      showNotificationWithTimeout(`${newBlog.title} added`, 5);
      setAddBlogVisible(false);
      newBlogTitle.reset();
      newBlogAuthor.reset();
      newBlogUrl.reset();
    } catch (e) {
      showNotificationWithTimeout(e.message, 5);
    }
  };

  const newBlogTitle = useField('text');
  const newBlogAuthor = useField('text');
  const newBlogUrl = useField('text');

  return (
    <div className='mt-2'>
      <Form onSubmit={addBlog}>
        <Form.Group as={Row} controlId='newBlogForm.title'>
          <Form.Label column sm='2'>Title</Form.Label>
          <Col sm='10'>
            <Form.Control sm='10' { ..._.omit(newBlogTitle, ['reset']) }/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='newBlogForm.author'>
          <Form.Label column sm='2'>Author</Form.Label>
          <Col sm='10'>
            <Form.Control { ..._.omit(newBlogAuthor, ['reset']) }/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='newBlogForm.url'>
          <Form.Label column sm='2'>Url</Form.Label>
          <Col sm='10'>
            <Form.Control sm='10' { ..._.omit(newBlogUrl, ['reset']) }/>
          </Col>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapDispatchToProps = {
  showNotificationWithTimeout,
  createBlog
};

const connectedNewBlog = connect(null, mapDispatchToProps)(NewBlog);

export default connectedNewBlog;
