import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Logout from './Logout';

const Menu = () => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <Navbar bg='light' expand='lg' variant='light'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>Home</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users' id='users'>Users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Logout />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
