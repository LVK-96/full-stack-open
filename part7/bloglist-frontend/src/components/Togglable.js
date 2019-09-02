import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <ButtonGroup className='addNewShow'>
        <div variant='primary' style={hideWhenVisible}>
          <Button className='mt-2' onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <Button className='mt-2' variant='danger' onClick={toggleVisibility}>cancel</Button>
        </div>
      </ButtonGroup>
    </div>
  );
};

export default Togglable;
