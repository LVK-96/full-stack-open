import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  return (
    <div className='mt-2'>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => a.likes < b.likes)
  };
};

const connectedBlogList = connect(mapStateToProps)(BlogList);

export default connectedBlogList;
