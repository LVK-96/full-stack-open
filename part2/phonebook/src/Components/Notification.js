import React from 'react'
import './Notification.css'

const Notification = ({ text }) => {
    let colorStyle = {
        color: 'green'
    }
    
    if (text.error) {
        colorStyle = {
            color: 'red'
        }
    }

    if (text.msg === null) {
        return null
    }

    return (
        <div className="notification" style={colorStyle}>
            {text.msg}
        </div>
    )
}

export default Notification