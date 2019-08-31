import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  if (notification === null)
    return null;
  
  return (
    <div className="notification">
      {notification}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

const connectedNotification = connect(mapStateToProps)(Notification);

export default connectedNotification;
